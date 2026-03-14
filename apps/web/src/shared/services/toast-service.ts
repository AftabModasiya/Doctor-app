import toast from "react-hot-toast";

const successToast = (message: string) => {
  toast.success(message, {
    position: "bottom-right",
  });
};

const errorToast = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
  });
};

const infoToast = (message: string) => {
  toast(message, {
    position: "bottom-right",
  });
};

const warningToast = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
    icon: "⚠️",
  });
};

let isToasterVisible = false;
let toastTimeout: any = null;

const showToaster = (message?: string) => {
  if (message) {
    errorToast(message);
  }

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  toastTimeout = setTimeout(() => {
    isToasterVisible = false;
    toastTimeout = null;
  }, 5000);
};

const enqueueErrorToast = (message: string) => {
  if (!isToasterVisible) {
    isToasterVisible = true;
    showToaster(message);
  }
};

export { infoToast, successToast, warningToast, errorToast, enqueueErrorToast };
