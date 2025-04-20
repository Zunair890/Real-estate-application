import { useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function UploadWidget({ uwconfig, setAvatar }) {
  const { currentUser, updateUser } = useContext(AuthContext);

  useEffect(() => {
    // Load Cloudinary script
    if (!document.getElementById("cloudinary-widget-script")) {
      const script = document.createElement("script");
      script.id = "cloudinary-widget-script";
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleUpload = () => {
    if (!window.cloudinary) {
      alert("Cloudinary script not loaded yet. Please try again.");
      return;
    }
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: uwconfig.cloudName,
        uploadPreset: uwconfig.uploadPreset,
        folder: uwconfig.folders?.[0],
        multiple: uwconfig.multiple,
        maxImageFileSize: uwconfig.maxImageSize,
      },
      (error, result) => {
        if (!error && result.event === "success") {
          const url = result.info.secure_url;
          setAvatar([url]);
          // Update context immediately
          updateUser({ ...currentUser, avatar: url });
        }
      }
    );
    widget.open();
  };

  return (
    <button type="button" onClick={handleUpload} className="cloudinary-button">
      Upload Avatar
    </button>
  );
}

export default UploadWidget;
