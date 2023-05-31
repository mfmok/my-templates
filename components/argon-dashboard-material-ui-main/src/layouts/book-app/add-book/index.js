/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";
import BookDataService from "../../../services/book.service";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonAvatar from "components/ArgonAvatar";
import CardMedia from "@mui/material/CardMedia";
import ArgonInput from "components/ArgonInput";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Book from "examples/Books/Book";

import { Link } from "react-router-dom";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import booksTableData from "layouts/book-app/book-list/data/booksTableData";

import nobooks from "../../../assets/images/nobooks.png";

function AddBook() {
  const { columns, rows } = booksTableData;

  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  
  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = () => {
    BookDataService.getAll()
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const refreshList = () => {
    retrieveBooks();
    setCurrentBook(null);
    setCurrentIndex(-1);
  }

  const setActiveBook = (book, index) => {
    setCurrentBook(book);
    setCurrentIndex(index);
  }

  const removeAllBooks = () => {
    BookDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const searchByTitle = () => {
    setCurrentBook(null);
    setCurrentIndex(-1);

    BookDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Card >
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="bold">
	    Add Book
          </ArgonTypography>
        </ArgonBox>
      <ArgonBox mt={5} mb={3} display="flex" justifyContent="center">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput name="title" id="title" placeholder="Title" size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput name="description" id="description" placeholder="Description" size="large" />
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" fullWidth>
            Add
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Add
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
          </Grid>
	</Grid>
      </ArgonBox>
      </Card>

	  <Card>
	  <ArgonBox>
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput name="title" id="title" placeholder="Title" size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput name="description" id="description" placeholder="Description" size="large" />
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" fullWidth>
            Add
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Add
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
	  </ArgonBox>
	  </Card>

      <Footer />
    </DashboardLayout>
  );
}

export default AddBook;
