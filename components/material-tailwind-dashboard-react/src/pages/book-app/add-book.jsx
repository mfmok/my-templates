import React from "react";
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
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function AddBook() {
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["blue", "green", "orange", "red"];

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
          <CardBody className="mb-4 flex flex-col gap-4">
            <Input label="Title" size="lg" />
            <Input label="Description" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth>
              Add
            </Button>
          </CardFooter>
        </Card>
    </div>
  );
}

export default AddBook;
