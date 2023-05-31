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
import PropTypes from "prop-types";

import React, { useState, useEffect } from "react";
import BookDataService from "../../../services/book.service";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonAvatar from "components/ArgonAvatar";
import CardMedia from "@mui/material/CardMedia";
import ArgonBadge from "components/ArgonBadge";

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
import cover from "../../../assets/images/not-available.png";

function BookList() {

  const columns = [
    { name: "book", align: "left" },
    { name: "description", align: "left" },
    { name: "available", align: "center" },
    { name: "action", align: "center" },
  ];


  const [books, setBooks] = useState([]);
  const [rows, setRows] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  
  useEffect(() => {
    retrieveBooks();
  }, []);

	
  function Book({ image, title }) {
    return (
      <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
        <ArgonBox mr={2}>
          <ArgonAvatar src={image} alt={title} size="sm" variant="rounded" />
        </ArgonBox>
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="button" fontWeight="medium">
            {title}
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    );
  }	

  Book.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
  };

  const getRows = (books) => {
    const rows = [];
	  console.log("length", books);
    books.map((book) => {
      rows.push(
        {
      book: <Book image={cover} title={book.title} />,
      available: (
        <ArgonBadge variant="gradient" badgeContent={ book.available ? "available" : "lent" } color={ book.available ? "success" : "warning" } size="xs" container />
      ),
      description: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {book.description} 
        </ArgonTypography>
      ),
      action: (
        <ArgonTypography
          component="a"
          href={ "/book-app/book-item/" + book.id }
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </ArgonTypography>
      ),
	}
      );
    });
    return rows;
  }

  const retrieveBooks = () => {
    BookDataService.getAll()
      .then((response) => {
        setBooks(response.data);
	setRows(getRows(response.data));
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

      { books.length > 0 ? (
      <ArgonBox py={3}>
        <ArgonBox>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Book table</ArgonTypography>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Books columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      ) : (
	      <Card>
            <ArgonBox display="flex" justifyContent="center" >
	        <CardMedia src={nobooks} component="img" title="No books" sx={{ maxWidth: "30%" }} />
	    </ArgonBox>
	      </Card>
      )
      }

      <ArgonBox display="flex" justifyContent="center" mt={3} mb={8}>
        <Link to={"/book-app/add-book"}>
        <ArgonButton color="info" size="medium">
          Add Book
        </ArgonButton>&nbsp;&nbsp;
        </Link>
	{ books.length > 0 ? (
        <ArgonButton color="error" size="medium" onClick={removeAllBooks} >
          Remove All Book
        </ArgonButton>
	) : ("")
	}
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default BookList;
