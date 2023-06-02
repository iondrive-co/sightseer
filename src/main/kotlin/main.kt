import kotlinx.browser.document
import kotlinx.browser.window
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.CanvasRenderingContext2D
import kotlin.js.JsExport
import kotlin.js.ExperimentalJsExport

@OptIn(ExperimentalJsExport::class)
@JsExport
class Sightseer {
    fun draw() {
        val canvasContainer = document.getElementById("canvas-container")
        var canvas = canvasContainer?.firstChild
        if (canvas == null) {
            canvas = document.createElement("canvas") as HTMLCanvasElement
            canvasContainer?.appendChild(canvas)
        }

        val context = (canvas as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D

        canvas.width = 500
        canvas.height = 500
        context.fillStyle = "blue"
        context.fillRect(50.0, 50.0, 200.0, 200.0)
    }
}

fun main() {
    val sightseer = Sightseer()
    window.asDynamic().sightseer = sightseer
}
