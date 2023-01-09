import Card from "../ui/Card";
import classes from "../products/ProductItem.module.css";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function MyOrderItem(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const date = new Date(props.date);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  useEffect(() => {
    let price = 0;
    for (const i in props.products) {
      price += props.products[i].product.cost * props.products[i].count;
    }
    setTotalPrice(price.toFixed(2));
  }, [props.products]);

  return (
    <li className={classes.item}>
      <Card>
        <div className="p-3">
          <b>Order number: </b>
          {props.id}
          <div className="text-start my-3">
            <div>
              <b>Date: </b>
              {formattedDate}
            </div>
            <div>
              <b>Total price: </b>${totalPrice}
            </div>
            <div>
              <b>Status: </b>
              {props.status}
            </div>
          </div>
          <Accordion>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>List of order products:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={"span"} variant={"body2"}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Product</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Price</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Quantity</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.products.map((product) => (
                        <TableRow
                          key={product.productId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Link to={`/product/${product.product.productId}`}>
                              {product.product.name}
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            ${product.product.cost.toFixed(2)}
                          </TableCell>
                          <TableCell align="right">{product.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Card>
    </li>
  );
}

export default MyOrderItem;
