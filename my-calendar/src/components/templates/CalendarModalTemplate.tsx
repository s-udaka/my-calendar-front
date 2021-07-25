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
  modalOpen: boolean;
  events: {
    handleClose: () => void;
    handleSetDate: (date: Date) => void;
    handleSetText: (text: string) => void;
    handleSetImage: (image: string) => void;
    handleAddEvent: () => void;
  };
  inputs: {
    date: Date;
    text: string;
    image: string;
  };
}

export const CalendarModalTemplate: React.FC<CalendarModalTemplateProps> = ({
  modalOpen,
  events,
  inputs,
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  //   const [value, setValue] = React.useState<Date | null>(
  //     new Date('2014-08-18T21:11:54')
  //   );

  const handleChangeDate = (newValue: Date | null) => {
    if (newValue) events.handleSetDate(newValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeText = (e: any) => {
    events.handleSetText(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeImage = (e: any) => {
    events.handleSetImage(e.target.value);
  };

  const onClickButton = () => {
    events.handleAddEvent();
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
      <h2>写真を追加する</h2>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={2}>
          <DesktopDatePicker
            label="Date picker desktop"
            inputFormat="MM/dd/yyyy"
            value={inputs.date}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Time picker"
            value={inputs.date}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <input
        type="text"
        name="text"
        placeholder="写真の一言をどうぞ"
        value={inputs.text}
        onChange={handleChangeText}></input>
      <input
        type="text"
        name="image"
        placeholder="ここに画像"
        value={inputs.image}
        onChange={handleChangeImage}></input>
      <button onClick={onClickButton}>写真を追加</button>
    </div>
  );

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={events.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
};
