#include <jni.h>
#include "nitrosyncOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::nitrosync::initialize(vm);
}
