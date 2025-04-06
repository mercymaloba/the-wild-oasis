/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format, isToday, parseISO } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests,
    cabins,
  },
}) {
  const guestName = guests?.fullName ?? "Unknown Guest";
  const email = guests?.email ?? "No email";
  const cabinName = cabins?.name ?? "Unknown Cabin";
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  // Ensure dates are parsed safely
  const parsedStartDate = startDate ? parseISO(startDate) : null;
  const parsedEndDate = endDate ? parseISO(endDate) : null;

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {parsedStartDate
            ? isToday(parsedStartDate)
              ? "Today"
              : formatDistanceFromNow(startDate)
            : "Unknown Date"}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {parsedStartDate && parsedEndDate
            ? `${format(parsedStartDate, "MMM dd yyyy")} — ${format(
                parsedEndDate,
                "MMM dd yyyy"
              )}`
            : "Invalid Dates"}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status] ?? "gray"}>
        {status ? status.replace("-", " ") : "Unknown Status"}
      </Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
        <Menus.Toggle id={bookingId}>
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in{" "}
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out{" "}
              </Menus.Button>
            )}
          </Menus.List>
        </Menus.Toggle>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
