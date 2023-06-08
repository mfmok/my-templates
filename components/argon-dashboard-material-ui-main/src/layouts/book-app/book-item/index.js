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
import { useParams, useNavigate } from 'react-router-dom';
import BookDataService from "../../../services/book.service";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import ArgonAlert from "components/ArgonAlert";

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
//import Book from "examples/Books/Book";

import { Link } from "react-router-dom";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import booksTableData from "layouts/book-app/book-list/data/booksTableData";

import nobooks from "../../../assets/images/nobooks.png";

function BookItem(props) {
    const { id }= useParams();
    let navigate = useNavigate();

  const initialBookState = {
    id: null,
    title: "",
    description: "",
    available: false
  };
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [message, setMessage] = useState("");

  const getBook = id => {
    BookDataService.get(id)
      .then(response => {
        setCurrentBook(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getBook(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const updateAvailability = status => {
    var data = {
      id: currentBook.id,
      title: currentBook.title,
      description: currentBook.description,
      available: status
    };

    BookDataService.update(currentBook.id, data)
      .then(response => {
        setCurrentBook({ ...currentBook, available: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBook = () => {
    BookDataService.update(currentBook.id, currentBook)
      .then(response => {
        console.log(response.data);
        setMessage("The book was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBook = () => {
    BookDataService.delete(currentBook.id)
      .then(response => {
        console.log(response.data);
        navigate("/book-app/books");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Card mb={10} >
        <ArgonBox mt={5} justifyContent="center" display="flex">
          <ArgonTypography variant="h4" color="text" >
	    Edit Book
          </ArgonTypography>
        </ArgonBox>
      <ArgonBox mt={3} mb={3} px={3} py={3} display="flex" justifyContent="center">
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={6} >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput name="title" id="title" placeholder="Title" value={currentBook.title} onChange={handleInputChange} size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput name="description" id="description" placeholder="Description" value={currentBook.description} onChange={handleInputChange} size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput name="available" id="available" placeholder="Availability" value={currentBook.available} size="large" readOnly />
        </ArgonBox>
        <ArgonBox mt={5} justifyContent="center" display="flex">
          <ArgonTypography variant="body" color="text" >
	    {message}
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={10} justifyContent="center" display="flex" >
          <ArgonButton color="success" size="medium" onClick={updateBook}>
            Update
          </ArgonButton>&nbsp;&nbsp;
          <ArgonButton color="error" size="medium" onClick={deleteBook}>
            Delete
          </ArgonButton>&nbsp;&nbsp;
	  { currentBook.available ? (
          <ArgonButton color="info" size="medium" onClick={() => updateAvailability(false)}>
            Lent Book
          </ArgonButton>
	  ) : (
          <ArgonButton color="info" size="medium" onClick={() => updateAvailability(true)}>
            Return to Library
          </ArgonButton>
	  ) }
        </ArgonBox>
      </ArgonBox>
          </Grid>
	</Grid>
      </ArgonBox>
      </Card>


      <Footer />
    </DashboardLayout>
  );
}

export default BookItem;
