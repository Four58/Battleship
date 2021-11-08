import { useCallback, useEffect } from "react";

//const { id: roomId } = useRandomId(idExist);

const useRandomId = (idExist) => {
  let realId = 0;

  const randomIt = useCallback(() => {
    const roomId = [];
    for (let i = 0; i < 5; i++) {
      roomId.push(Math.floor(Math.random() * 10));
    }
    let id = +roomId.join("");
    for (let k of idExist) {
      if (k === id) {
        return randomIt(idExist);
      }
    }
    realId = id;
  }, []);

  useEffect(() => {
    randomIt();
  }, [randomIt]);

  return realId;
};
