package com.margelo.nitro.nitrosync
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class NitroSync : HybridNitroSyncSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
