import Toast from "react-native-root-toast";

const useShowToastMessage = () => {
  const showToastMessage = (
    message = "",
    status = "success",
    duration = 3000
  ) => {
    Toast.show(message, {
      duration: duration,
      backgroundColor: status === "success" ? "rgba(51, 105, 179, 1)" : "red",
      shadow: true,
      position: Toast.positions.TOP,
      textColor: "white", // Assuming COLOR is defined somewhere
      opacity: 1, // Should be 1 for full opacity
      animation: true,
    });
  };

  return showToastMessage;
};

export default useShowToastMessage;
