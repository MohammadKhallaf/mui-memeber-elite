import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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
  const [loading, setLoading] = useState<string | number>('');
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const columns: GridColDef<IMember>[] = [
    { field: 'id_number', headerName: 'ID Number', width: 120 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'membership_type', headerName: 'Membership Type', width: 150 },
    {
      field: 'membership_start_date',
      headerName: 'Membership Start',
      valueFormatter: (params) => formatDate(params.value),
      width: 100,
    },
    { field: 'phone', headerName: 'Phone', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Link to={`/members/${params.id}`}>
            <Button color="primary" size="small" endIcon={<Visibility />}>
              Show
            </Button>
          </Link>
          <Link to={`/members/${params.id}/edit`}>
            <Button color="secondary" size="small" endIcon={<Edit />}>
              Edit
            </Button>
          </Link>
          <LoadingButton
            loading={loading === params.id}
            onClick={() => handleDeleteMember(params.id)}
            color="error"
            size="small"
            endIcon={<Delete />}>
            Delete
          </LoadingButton>
        </Box>
      ),
    },
  ];

  const handleDeleteMember = (id: IMember['id']) => {
    setLoading(id);
    setTimeout(() => {
      dispatch(removeMember(id));
      enqueueSnackbar('Member Removed Successfully!', { variant: 'success' });
      setLoading('');
    }, 3000);
  };
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
        <DataGrid rows={members} columns={columns} disableRowSelectionOnClick />
      </Paper>
    </Box>
  );
};

export default ListMembersPage;
