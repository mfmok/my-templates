import React, { useState } from "react";
import BookDataService from "../../services/book.service";
import { Link } from "react-router-dom";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

export function AddBook() {
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
    <div className="mx-auto my-40 flex max-w-screen-lg flex-col gap-8">
        <Card className="top-2/4 left-2/4 w-full max-w-[24rem]  -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-14 place-items-center"
          >
            <Typography variant="h3" color="white">
              Add Book
            </Typography>
          </CardHeader>
          { submitted ? (
            <>
            <CardBody className="mb-4 flex flex-col gap-4">
              <Typography variant="h5" className="text-center">
                You submitted successfully!
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={newBook} fullWidth>
                add book
              </Button>
            </CardFooter>
            </>
          ) : (
            <>
            <CardBody className="mb-4 flex flex-col gap-4">
              <Input id="title" label="Title" name="title" size="lg" onChange={handleInputChange} required />
              <Input id="description" label="Description" name="description" size="lg" onChange={handleInputChange} />
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={saveBook} fullWidth>
                Add
              </Button>
            </CardFooter>
            </>
          ) }
          </Card>
    </div>
  );
}

export default AddBook;
