import { Unity, useUnityContext } from "react-unity-webgl";
import { useCallback, useEffect } from "react";

interface UnityGameProps {
  path: string;
  onQuit?: () => void;
}

export function UnityGame({ path, onQuit }: UnityGameProps) {
  const { unityProvider, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: `${path}/Build/WebGL.loader.js`,
      dataUrl: `${path}/Build/WebGL.data`,
      frameworkUrl: `${path}/Build/WebGL.framework.js`,
      codeUrl: `${path}/Build/WebGL.wasm`,
    });

  const handleQuit = useCallback(() => {
    console.log("QuitGame event received");
    onQuit?.();
  }, []);

  useEffect(() => {
    addEventListener("QuitGame", handleQuit);

    return () => removeEventListener("QuitGame", handleQuit);
  }, [addEventListener, removeEventListener, onQuit]);

  return (
    <Unity
      unityProvider={unityProvider}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
