plugins {
    kotlin("js") version "1.7.10"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    // implementation("org.jetbrains.kotlinx:kotlinx-html-js:0.8.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.2")
    testImplementation(kotlin("test"))
}

tasks.register<Copy>("output") {
    dependsOn("clean", "browserWebpack")
    from("$buildDir/distributions")
    into("app/components")
    include("sightseer.js")
}

tasks.named("assemble") {
    finalizedBy("output")
}

kotlin {
    // js(LEGACY) {
    //     binaries.executable()
    //     browser {
    //         commonWebpackConfig {
    //             cssSupport.enabled = true
    //         }
    //     }
    // }
   js(IR) {
       browser()
       binaries.executable()
   }
}