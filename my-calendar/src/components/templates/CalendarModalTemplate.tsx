import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const theme = createTheme();
const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export interface CalendarModalTemplateProps {
  events: {
    handleClose: () => void;
  };
  inputs: {
    modalOpen: boolean;
    // startTime: Date;
  };
}

export const CalendarModalTemplate: React.FC<CalendarModalTemplateProps> = ({
  events,
  inputs,
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  //   const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={2}>
          <DesktopDatePicker
            label="Date picker desktop"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Time picker"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );

  return (
    <div>
      <Modal
        open={inputs.modalOpen}
        onClose={events.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
};
