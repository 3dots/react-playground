import type { Dispatch } from "react";
import { useEffect, useState } from "react";

export function useRFetch<T>(
  func: () => Promise<T>,
): [T | null, Dispatch<T | null>, boolean, string] {
  const [result, setResult] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function wrapper() {
      setIsFetching(true);
      try {
        const result = await func();
        setResult(result);
        console.log("what succeeded");
      } catch (error) {
        console.log(error);
        let msgPrefix = `${useRFetch.name} promise failed.`;
        let msg = "";
        if (error !== null && typeof error === "object" && "message" in error)
          msg = `${msgPrefix} ${error.message}`;
        if (error !== null && typeof error === "string")
          msg = `${msgPrefix} ${error}`;
        setErrorMsg(msg);
      }

      setIsFetching(false);
    }

    console.log("what");
    wrapper();
  }, [func]);

  return [result, setResult, isFetching, errorMsg];
}
