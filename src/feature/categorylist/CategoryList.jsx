import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dateFormat from "dateformat";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { getCategory } from "../reduxSlice/categorySlice";
import { DataGridGroup, DataGridTitle } from "./CategoryListStyle";
const CategoryList = () => {
  const categoryList = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        await dispatch(getCategory());
      } catch (error) {}
    };
    fetchCategory();
  }, [dispatch]);
  //category list
  const categoryRows = categoryList.category.map((item) => ({
    _id: item._id,
    name: item.name,
    slug: item.slug,
  }));
  const categoryColumns = [
    { field: "name", headerName: "Tên Loại", width: 200 },
    { field: "slug", headerName: "Slug", width: 200 },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 220,
      renderCell: (params) => {
        return (
          <div>{dateFormat(params.row.createdAt, "dddd, mmmm dS, yyyy")}</div>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 110,
      renderCell: (params) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={"/loai-san-pham/cap-nhat/" + params.row._id}>
              <IconButton color="primary">
                <EditOutlined />
              </IconButton>
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <DataGridGroup>
        <DataGridTitle>Danh sách loại sản phẩm</DataGridTitle>
        <div style={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={categoryRows}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={categoryColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            loading={categoryList.isLoading}
            pagination
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </DataGridGroup>
    </Layout>
  );
};

export default CategoryList;
