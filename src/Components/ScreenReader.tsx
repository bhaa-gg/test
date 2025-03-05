import { Html5QrcodeScanner } from "html5-qrcode";
import React from "react";

const ScreenReader = ({
  setScaningData,
}: {
  setScaningData: (id: string) => void;
}) => {
  const startScan = () => {
    const onSuccess = (data: string) => {
      setScaningData(data);
      scanner.clear();
    };
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: { width: 200, height: 100 },
        fps: 5,
      },
      false
    );

    scanner.render(onSuccess, (error) => {
      console.warn(error);
    });
  };

  return (
    <div>
      <div id="reader" style={{ width: "100%", maxWidth: "250px" }}></div>
      <button
        className="bg-primaryColor m-5 rounded-md px-3 py-1 text-white text-center"
        onClick={startScan}
      >
        Start Scan
      </button>
    </div>
  );
};

export default ScreenReader;
