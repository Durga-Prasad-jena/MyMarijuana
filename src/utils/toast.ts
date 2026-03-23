import toast, { ToastOptions } from "react-hot-toast";

const toastOptions: ToastOptions = {
  position: "top-right",
};

 const notify = (
  message: string,
  type: "success" | "error" = "success"
) => {
  switch (type) {
    case "success":
      return toast.success(message, toastOptions);
    case "error":
      return toast.error(message, toastOptions);
    default:
      return;
  }
};
export default notify;
