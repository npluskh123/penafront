import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
//import { Select } from '@mui/material';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [surname, setSurname] = React.useState('');
  const [telephone, setTelephone] = React.useState('');
  const [adress, setAdress] = React.useState('');
  const [payment, setPayment] = React.useState('');
  const [length, setLength] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [sum, setSum] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [numberCarpet, setNumberCarpet] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null); //photo
  const tel = 'tel:' + String(telephone);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  };
  const [date, setDate] = React.useState(new Date().toLocaleString('ru', options));
  const isEditing = Boolean(id);

  //передача файла на сервер
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке фото');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  //для сохранения того что ввели
  const onChange = React.useCallback((value) => {
    setNumberCarpet(value);
    setSurname(value);
    setImageUrl(value);
    setPayment(value);
    setTelephone(value);
    setAdress(value);
    setLength(value);
    setWidth(value);
    setCategory(value);
    setSum(value);
    setStatus(value);
    setDate(value);
    setComment(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        numberCarpet,
        surname,
        telephone,
        adress,
        date,
        payment,
        length,
        width,
        category,
        sum,
        comment,
        status,
        imageUrl,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;
      navigate(`/`);
      // navigate(`/posts/${id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании записи');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setNumberCarpet(data.numberCarpet);
          setSurname(data.surname);
          setImageUrl(data.imageUrl);
          setTelephone(data.telephone);
          setAdress(data.adress);
          setPayment(data.payment);
          setDate(data.date);
          setLength(data.length);
          setWidth(data.width);
          setCategory(data.category);
          setSum(data.sum);
          setStatus(data.status);
          setComment(data.comment);
          //setTags(data.tags.join(','));
        })
        .catch((err) => {
          console.warn(err);
          alert('ошибка при получении');
        });
    }
  }, []);

  // const options = React.useMemo(
  //   () => ({
  //     spellChecker: false,
  //     maxHeight: '100px',
  //     autofocus: true,
  //     placeholder: 'Примечание...',
  //     status: false,
  //     autosave: {
  //       enabled: true,
  //       delay: 1000,
  //     },
  //   }),
  //   [],
  // );

  // const [age, setAge] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <div>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-label">Статус</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Статус"
            defaultValue={0}
            onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value={0}>Принят в работу</MenuItem>
            <MenuItem value={1}>Готов к отгрузке</MenuItem>
            <MenuItem value={2}>Получен клиентом</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-label">Оплата</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={payment}
            label="Оплата"
            // defaultValue={false}
            onChange={(e) => setPayment(e.target.value)}>
            <MenuItem value={'Не оплачено'}>Не оплачено</MenuItem>
            <MenuItem value={'Оплачено наличными'}>Оплачено наличными</MenuItem>
            <MenuItem value={'Оплачено мобильным банком'}>Оплачено мобильным банком</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <a href={tel}>
          <Button sx={{ m: 1 }} variant="contained" endIcon={<SendIcon />}>
            Позвонить {telephone}
          </Button>
        </a>
      </div>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off">
        <div>
          <TextField
            id="outlined-number"
            variant="outlined"
            type="number"
            label="Номер ковра"
            value={numberCarpet}
            onChange={(e) => setNumberCarpet(e.target.value)}
            fullWidth
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Фамилия клиента"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="outlined-number"
            variant="outlined"
            type="number"
            label="телефон"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            fullWidth
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Адрес"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Комментарии"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="outlined-number"
            label="Длина"
            value={length}
            type="number"
            placeholder="метр"
            IInputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setLength(e.target.value)}
            fullWidth
          />
        </div>

        <div>
          <TextField
            id="outlined-number"
            label="Ширина"
            value={width}
            type="number"
            placeholder="метр"
            IInputLabelProps={{
              shrink: true,
            }}
            defaultValue={0}
            onChange={(e) => setWidth(e.target.value)}
            fullWidth
          />
        </div>

        <div>
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-label">Категория</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Категория"
              defaultValue={0}
              onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value={0}>0₽</MenuItem>
              <MenuItem value={150}>150₽</MenuItem>
              <MenuItem value={160}>160₽</MenuItem>
              <MenuItem value={170}>170₽</MenuItem>
              <MenuItem value={180}>180₽</MenuItem>
              <MenuItem value={190}>190₽</MenuItem>
              <MenuItem value={200}>200₽</MenuItem>
              <MenuItem value={210}>210₽</MenuItem>
              <MenuItem value={220}>220₽</MenuItem>
              <MenuItem value={230}>230₽</MenuItem>
              <MenuItem value={240}>240₽</MenuItem>
              <MenuItem value={250}>250₽</MenuItem>
              <MenuItem value={260}>260₽</MenuItem>
              <MenuItem value={270}>270₽</MenuItem>
              <MenuItem value={280}>280₽</MenuItem>
              <MenuItem value={290}>290₽</MenuItem>
              <MenuItem value={300}>300₽</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
      <div>
        <Stack sx={{ m: 1, width: '100%' }} spacing={2}>
          <Alert severity="info">
            <AlertTitle>Сумма</AlertTitle>
            Итого — <strong>{Number(category) * Number(length) * Number(width)}₽</strong>
          </Alert>
        </Stack>
      </div>

      {/* <Button
        sx={{ m: 1 }}
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large">
        Загрузить фото
      </Button> */}
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`process.env.PORT${imageUrl}`} alt="Uploaded" />
          {/* <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" /> */}
        </>
      )}

      {/* <SimpleMDE className={styles.editor} value={surname} onChange={onChange} options={options} /> */}

      <div>
        <Button onClick={onSubmit} sx={{ m: 1 }} variant="contained" endIcon={<SendIcon />}>
          Сохранить
        </Button>
        <a href="/">
          <Button sx={{ m: 1 }} variant="outlined">
            Отмена
          </Button>
        </a>
      </div>
    </Paper>
  );
};
