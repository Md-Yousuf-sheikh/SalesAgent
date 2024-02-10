import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import LeftBlue from "../../../assets/left-blue.svg";
import RightBlue from "../../../assets/right-blue.svg";
import { COLOR, rh, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";

const Pagination = ({
  currentPage,
  setCurrentPage,
  pagination,
  type = null,
}) => {
  const totalPages = pagination ? pagination.last_page : 3; // Assuming there are 20 pages in total

  const handlePagePress = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    var maxButtonsToShow = 6;
    if (totalPages > 6) {
      maxButtonsToShow = 6;
    } else {
      maxButtonsToShow = totalPages;
    }
    const halfButtonsToShow = Math.floor(maxButtonsToShow / 2);

    let startPage = currentPage - halfButtonsToShow;
    let endPage = currentPage + halfButtonsToShow;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }
    if (endPage > totalPages) {
      //   startPage -= endPage - totalPages
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <TouchableOpacity
          onPress={() => handlePagePress(i)}
          disabled={currentPage === i}
          key={i}
          style={[
            styles.scrollButton,
            {
              backgroundColor: currentPage === i ? "#1691CE" : "#F0F0F0",
            },
          ]}
        >
          <Text
            preset="h5"
            style={{
              fontWeight: "700",
              color: currentPage === i ? COLOR.white : "#4F4F4F",
            }}
          >
            {i.toString()}
          </Text>
        </TouchableOpacity>
      );
    }

    return pageButtons;
  };

  return (
    <>
      {type === "lodeMore" ? (
        <>
          {pagination?.last_page !== currentPage && (
            <View style={styles.nextPrvStyle}>
              {/* Next */}
              <TouchableOpacity
                onPress={handleNext}
                disabled={currentPage === totalPages}
                style={styles.nextButton}
              >
                <Text preset="h6" color={"#ffff"}>
                  Lode More
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentPage === 1}
          >
            <LeftBlue style={{ marginRight: rh(1) }} />
          </TouchableOpacity>
          <View style={styles.pageButtonsContainer}>{renderPageButtons()}</View>
          <TouchableOpacity
            onPress={handleNext}
            disabled={currentPage === totalPages}
          >
            <RightBlue style={{ marginLeft: rh(1) }} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    marginVertical: rh(3),
  },
  pageButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollButton: {
    minHeight: rh(2.5),
    minWidth: rw(4),
    backgroundColor: "#1691CE",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: rh(1),
    borderRadius: rh(0.3),
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  nextPrvStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: COLOR.LinearBlue,
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: 10,
    alignSelf: "center",
    marginVertical: 15,
  },
});

export default Pagination;
