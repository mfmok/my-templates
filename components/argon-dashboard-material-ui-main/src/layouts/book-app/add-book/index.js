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
import Books from "examples/Books";

import { Link } from "react-router-dom";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import booksTableData from "layouts/book-app/book-list/data/booksTableData";

import nobooks from "../../../assets/images/nobooks.png";

function AddBook() {

  const initialBookState = {
    id: null,
    title: "",
    description: "",
    available: false
  };
  const [book, setBook] = useState(initialBookState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    var data = {
      title: book.title,
      description: book.description
    };

    BookDataService.create(data)
      .then(response => {
        setBook({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          availability: response.data.availability
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBook = () => {
    setBook(initialBookState);
    setSubmitted(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Card mb={10} >
        <ArgonBox mt={5} justifyContent="center" display="flex">
          <ArgonTypography variant="h4" color="text" >
	    Add Book
          </ArgonTypography>
        </ArgonBox>
	{ submitted ? (
      <ArgonBox mt={3} mb={3} px={3} py={3} display="flex" justifyContent="center">
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={6} >
        <ArgonBox mt={5} justifyContent="center" display="flex">
          <ArgonTypography variant="body" color="text" >
	    You submitted successfully!
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={10} justifyContent="center" display="flex" >
          <ArgonButton color="info" size="medium" onClick={newBook} >
            Add another Book
          </ArgonButton>
        </ArgonBox>
	  </Grid>
	</Grid>
      </ArgonBox>
	) : (
      <ArgonBox mt={3} mb={3} px={3} py={3} display="flex" justifyContent="center">
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={6} >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput name="title" id="title" placeholder="Title" size="large" onChange={handleInputChange}/>
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput name="description" id="description" placeholder="Description" size="large" onChange={handleInputChange}/>
        </ArgonBox>
        <ArgonBox mt={4} mb={10} justifyContent="center" display="flex" >
          <ArgonButton color="info" size="medium" onClick={saveBook} >
            Add
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
          </Grid>
	</Grid>
      </ArgonBox>
	) }
      </Card>


      <Footer />
    </DashboardLayout>
  );
}

export default AddBook;
