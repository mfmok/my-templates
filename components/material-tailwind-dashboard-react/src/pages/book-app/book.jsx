import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
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

export function Book(props) {
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
    <div className="mx-auto my-40 flex max-w-screen-lg flex-col gap-8">
        <Card className="top-2/4 left-2/4 w-full max-w-[34rem]  -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-14 place-items-center"
          >
            <Typography variant="h3" color="white">
              Edit Book
            </Typography>
          </CardHeader>
            <>
            <CardBody className="mb-4 flex flex-col gap-4">
              <Input id="title" label="Title" name="title" size="lg" value={currentBook.title} onChange={handleInputChange} required />
              <Input id="description" label="Description" name="description" size="lg" value={currentBook.description} onChange={handleInputChange} />
              <Input id="available" label="Availability" name="available" size="lg" value={currentBook.available} readOnly />
            </CardBody>
            <CardFooter className="flex justify-center pt-0 gap-4">
              <Button color="green" variant="gradient" onClick={updateBook} >
                update
              </Button>
              <Button color="red" variant="gradient" onClick={deleteBook} >
                delete
              </Button>
              { currentBook.available ? (
                <Button color="blue" variant="gradient" onClick={() => updateAvailability(false)} >
                  lent book
                </Button>
              ) : (
                <Button color="blue" variant="gradient" onClick={() => updateAvailability(true)} >
                  return to library
                </Button>
              ) }
            </CardFooter>
            </>
          </Card>
    </div>
  );
}

export default Book;
