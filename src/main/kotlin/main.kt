import kotlinx.browser.document
import kotlinx.browser.window
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.CanvasRenderingContext2D
import kotlin.js.JsExport
import kotlin.js.ExperimentalJsExport
import org.w3c.dom.*
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import org.w3c.files.File
import org.w3c.files.FileReader
import org.w3c.files.get
import kotlin.math.min
import org.w3c.dom.events.MouseEvent
import org.w3c.dom.events.WheelEvent

fun main() {
    val sightseer = Sightseer()
    window.asDynamic().sightseer = sightseer
}

@OptIn(ExperimentalJsExport::class)
@JsExport
class Sightseer {
    private lateinit var canvas: HTMLCanvasElement
    private lateinit var ctx: CanvasRenderingContext2D
    private lateinit var cropButton: HTMLButtonElement
    private lateinit var saveButton: HTMLButtonElement
    private val tempCanvas = document.createElement("canvas") as HTMLCanvasElement
    private val tempCtx = tempCanvas.getContext("2d") as CanvasRenderingContext2D
    private var isSelecting = false
    private var selectionStartX = 0.0
    private var selectionStartY = 0.0
    private var scale = 1.0
    private val ZOOM_STEP = 0.1
    private val imageFiles = mutableListOf<File>()
    private var currentImageIndex = 0
    private var currentImageSrc: String = ""
    private var cropStartX = 0.0
    private var cropStartY = 0.0
    private var cropWidth = 0.0
    private var cropHeight = 0.0
    private var offsetX = 0.0
    private var offsetY = 0.0
    private var isDragging = false
    private var lastMouseX = 0.0
    private var lastMouseY = 0.0

    fun draw() {
        val canvasContainer = document.getElementById("canvas-container")
        var canvasElement = canvasContainer?.firstChild
        if (canvasElement == null) {
            canvasElement = document.createElement("canvas") as HTMLCanvasElement
            canvasContainer?.appendChild(canvas)
        }
        canvas = canvasElement as HTMLCanvasElement
        ctx = canvas.getContext("2d") as CanvasRenderingContext2D

        canvas.width = 500
        canvas.height = 500
        ctx.fillStyle = "blue"
        ctx.fillRect(50.0, 50.0, 200.0, 200.0)

        val input = document.createElement("input") as HTMLInputElement
        cropButton = document.createElement("button") as HTMLButtonElement
        cropButton.setAttribute("disabled", "true")
        saveButton = document.createElement("button") as HTMLButtonElement

        val buttonsWrapper = document.createElement("div") as HTMLDivElement
        buttonsWrapper.style.apply {
            position = "fixed"
            top = "20px"
            right = "20px"
            display = "flex"
            flexDirection = "column"
            //gap = "10px"
        }

        input.setAttribute("webkitdirectory", "true")
        input.type = "file"
        input.multiple = true
        input.accept = "image/*"
        input.addEventListener("change", { event -> onFileInputChange(event) })

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        tempCanvas.width = window.innerWidth
        tempCanvas.height = window.innerHeight

        tempCanvas.style.apply {
            position = "absolute"
            top = "0px"
            left = "0px"
        }
        tempCanvas.style.setProperty("pointer-events", "none")

        cropButton.textContent = "Crop"
        cropButton.addEventListener("click", { _ -> cropImage() })

        saveButton.textContent = "Save"
        saveButton.addEventListener("click", { _ -> saveImage() })

        // Reset the body margin and padding
        document.body?.style?.apply {
            margin = "0"
            padding = "0"
        }

        document.body?.append(canvas, buttonsWrapper)
        buttonsWrapper.append(input, cropButton, saveButton)
        document.body?.insertBefore(tempCanvas, canvas.nextSibling)

        document.addEventListener("keydown", { event ->
            val keyboardEvent = event as KeyboardEvent
            if (keyboardEvent.keyCode == 37) {
                // Left arrow key pressed
                if (currentImageIndex > 0) {
                    currentImageIndex--
                    loadImage(imageFiles[currentImageIndex])
                    scale = 1.0
                    offsetX = 0.0
                    offsetY = 0.0
                }
            } else if (keyboardEvent.keyCode == 39) {
                // Right arrow key pressed
                if (currentImageIndex < imageFiles.size - 1) {
                    currentImageIndex++
                    loadImage(imageFiles[currentImageIndex])
                    scale = 1.0
                    offsetX = 0.0
                    offsetY = 0.0
                }
            }
        })

        canvas.addEventListener("mousedown", { event -> onMouseDown(event) })
        canvas.addEventListener("mousemove", { event -> onMouseMove(event) })
        canvas.addEventListener("mouseup", { onMouseUp() })

        canvas.addEventListener("wheel", { event ->
            val wheelEvent = event as WheelEvent
            if (wheelEvent.ctrlKey) {
                wheelEvent.preventDefault()
                scale += if (wheelEvent.deltaY > 0) -ZOOM_STEP else ZOOM_STEP
                loadImage(imageFiles[currentImageIndex])
            }
        })
    }

    fun onFileInputChange(event: Event) {
        val input = event.target as HTMLInputElement
        val files = input.files
        if (files != null && files.length > 0) {
            imageFiles.clear()
            for (i in 0 until files.length) {
                val file = files[i]!!
                imageFiles.add(file)
            }
            loadImage(imageFiles[0])
        }
    }

    fun loadImage(file: File) {
        val reader = FileReader()
        reader.onload = { event ->
            currentImageSrc = reader.result as String
            val img = Image()
            img.src = currentImageSrc
            img.onload = { _ ->
                if(::canvas.isInitialized && ::ctx.isInitialized) {
                    ctx.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())

                    val baseScale = min(canvas.width.toDouble() / img.width, canvas.height.toDouble() / img.height)

                    val width = img.width * baseScale * scale
                    val height = img.height * baseScale * scale

                    val x = (canvas.width - width) / 2.0 + offsetX
                    val y = (canvas.height - height) / 2.0 + offsetY

                    ctx.drawImage(img, x, y, width, height)
                }
            }
            val imgSrc = (event.target as FileReader).result as? String ?: ""
            img.setAttribute("src", imgSrc)
        }
        reader.readAsDataURL(file)
    }

    fun onMouseDown(event: Event) {
        val mouseEvent = event as MouseEvent
        if (mouseEvent.shiftKey) {
            isDragging = true
            lastMouseX = mouseEvent.clientX.toDouble()
            lastMouseY = mouseEvent.clientY.toDouble()
        } else {
            isSelecting = true
            selectionStartX = mouseEvent.clientX.toDouble()
            selectionStartY = mouseEvent.clientY.toDouble()
        }
    }

    fun onMouseMove(event: Event) {
        val mouseEvent = event as MouseEvent
        val x = mouseEvent.clientX.toDouble()
        val y = mouseEvent.clientY.toDouble()
        if (isSelecting) {
            cropWidth = x - selectionStartX
            cropHeight = y - selectionStartY
            drawTempCanvas()
        }
        if (isDragging) {
            offsetX += (x - lastMouseX)
            offsetY += (y - lastMouseY)
            lastMouseX = x
            lastMouseY = y
            loadImage(imageFiles[currentImageIndex])
        }
    }

    fun onMouseUp() {
        if (isSelecting) {
            cropStartX = selectionStartX
            cropStartY = selectionStartY
            isSelecting = false
            cropButton.removeAttribute("disabled")
        }
        if (isDragging) {
            isDragging = false
        }
    }

    fun drawTempCanvas() {
        tempCtx.clearRect(0.0, 0.0, tempCanvas.width.toDouble(), tempCanvas.height.toDouble())
        tempCtx.beginPath()
        tempCtx.rect(selectionStartX, selectionStartY, cropWidth, cropHeight)
        tempCtx.strokeStyle = "#FF0000"
        tempCtx.stroke()
    }

    fun cropImage() {
        if (cropWidth <= 0 || cropHeight <= 0) {
            window.alert("Please select a valid area to crop.")
            return
        }

        val img = Image()
        img.src = currentImageSrc
        img.onload = { _ ->
            // Calculate the scale and position
            val scale = min(canvas.width.toDouble() / img.width, canvas.height.toDouble() / img.height)
            val imgX = (canvas.width - img.width * scale) / 2.0
            val imgY = (canvas.height - img.height * scale) / 2.0

            // Calculate the crop area relative to the image
            val relativeCropX = (cropStartX - imgX) / scale
            val relativeCropY = (cropStartY - imgY) / scale
            val relativeCropWidth = cropWidth / scale
            val relativeCropHeight = cropHeight / scale

            ctx.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
            ctx.drawImage(
                img,
                relativeCropX, relativeCropY, relativeCropWidth, relativeCropHeight,
                cropStartX, cropStartY, cropWidth, cropHeight
            )
        }
    }

    fun saveImage() {
        window.open(canvas.toDataURL("image/png"), "_blank")
    }
}