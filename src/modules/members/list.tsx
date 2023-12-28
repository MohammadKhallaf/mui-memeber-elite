import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store';
import { IMember } from './members.modal';
import { removeMember } from './members.slice';

const formatDate = (value: Date | string) => {
  if (typeof value === 'string') {
    value = new Date(value);
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value);
};

const ListMembersPage = (): React.ReactElement => {
  const members = useAppSelector((state) => state.members);

  const columns: GridColDef<IMember>[] = [
    { field: 'id_number', headerName: 'ID Number', width: 120, filterable: true },
    { field: 'name', headerName: 'Name', flex: 1, filterable: true },
    { field: 'email', headerName: 'Email', flex: 1, filterable: true },
    { field: 'membership_type', headerName: 'Membership Type', width: 150, filterable: true },
    {
      field: 'membership_start_date',
      headerName: 'Membership Start',
      valueFormatter: (params) => formatDate(params.value),
      width: 100,
      filterable: true,
      type: 'date',
    },
    { field: 'phone', headerName: 'Phone', width: 100, filterable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      sortable: false,
      renderCell: (params) => <MemberRowAction id={params.id} />,
    },
  ];

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 960,
        mx: 'auto',
        my: 4,
      }}>
      <Box sx={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', mb: 1 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Members List{' '}
        </Typography>
        <Link to="create">
          <Button color="primary" variant="contained" size="small" endIcon={<Add />}>
            Add new member
          </Button>
        </Link>
      </Box>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={members}
          columns={columns}
          disableRowSelectionOnClick
          filterMode="client"
        />
      </Paper>
    </Box>
  );
};

export default ListMembersPage;

const MemberRowAction = ({ id }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteMember = (id: IMember['id']) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(removeMember(id));
      enqueueSnackbar('Member Removed Successfully!', { variant: 'success' });
      setLoading(false);
    }, 3000);
  };
  return (
    <Box>
      <Link to={`/members/${id}`}>
        <Button color="primary" size="small" endIcon={<Visibility />}>
          Show
        </Button>
      </Link>
      <Link to={`/members/${id}/edit`}>
        <Button color="secondary" size="small" endIcon={<Edit />}>
          Edit
        </Button>
      </Link>
      <Button onClick={handleClickOpen} color="error" size="small" endIcon={<Delete />}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Confirm!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this member? this operation cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={loading}
            onClick={() => handleDeleteMember(id)}
            color="error"
            size="small"
            variant="contained"
            autoFocus
            endIcon={<Delete />}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
