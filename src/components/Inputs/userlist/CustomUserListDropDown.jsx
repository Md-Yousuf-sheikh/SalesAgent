import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useGetAllCustomersQuery } from "../../../redux/features/customer/customerApiSlice";

const CustomUserListDropDown = ({}) => {
  const [data, setData] = useState([]); // Your list of items
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // APIS
  const {
    data: users,
    refetch,
    isLoading,
  } = useGetAllCustomersQuery("?type=b2c");

  useEffect(() => {
    // Fetch initial data or populate 'data' state with your items
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Simulating API call or fetching data from your source
      // const response = await fetch(`https://api.example.com/data?page=${page}`);
      // const newData = await response.json();
      // setData((prevData) => [...prevData, ...newData]);
      // setFilteredData((prevData) => [...prevData, ...newData]);
      // setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log("Selected:", item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const handleEndReached = () => {
    if (!loading) {
      fetchData();
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderDropdownItem}
        keyExtractor={(item) => item.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default CustomUserListDropDown;
