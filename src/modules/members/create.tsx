import { yupResolver } from '@hookform/resolvers/yup';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import 'filepond/dist/filepond.min.css';
import { DateTime } from 'luxon';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store';
import { EGender, EMembershipType, IMember } from './members.modal';
import memberSchema from './members.schema';
import { addMember, editMember } from './members.slice';

type Props = {
  editMode?: boolean;
};
registerPlugin(
  FilePondPluginImageValidateSize,
  FilePondPluginFileRename,
  FilePondPluginFileValidateSize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageEdit
);

function CreateMemberPage({ editMode }: Props): React.ReactElement {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.members);
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(memberSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      id_number: '',
      address: '',
      date_of_birth: '' as unknown as Date,
      membership_start_date: '' as unknown as Date,
      gender: '' as unknown as EGender,
      is_newsletter_subscribe: false,
      membership_type: '' as unknown as EMembershipType,
      photo_url: '',
    }, // to stop the warning of date/s
  });

  const handleFormSubmit = (data: IMember): void => {
    setLoading(true);

    setTimeout(() => {
      if (editMode) {
        dispatch(editMember(data));
        enqueueSnackbar('Member Updated Successfully!', { variant: 'success' });
      } else {
        dispatch(addMember(data));
        enqueueSnackbar('Member Added Successfully!', { variant: 'success' });
      }
      reset();
      navigate('/members');
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (!(editMode && params.memberId)) return;

    const currentMember = members.find((member) => member.id === params.memberId);
    if (!currentMember.id) return;

    reset({
      ...currentMember,
      date_of_birth: new Date(currentMember.date_of_birth),
      membership_start_date: new Date(currentMember.membership_start_date),
    });
  }, [params, editMode, members]);

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 960,
        mx: 'auto',
        my: 4,
      }}>
      <Box gridColumn="span 2" sx={{ zIndex: 1 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create Member Profile
        </Typography>
      </Box>
      <Paper
        noValidate
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ px: 3, pb: 5, pt: 0, position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            height: 150,
            zIndex: 0,
            bgcolor: 'primary.main',
          }}></Box>
        <Box sx={{ mb: 3, width: 150, mt: '70px', mx: 'auto' }}>
          <FormControl fullWidth>
            <FilePond
              stylePanelLayout="compact circle"
              styleLoadIndicatorPosition="center bottom"
              styleProgressIndicatorPosition="right bottom"
              styleButtonRemoveItemPosition="left bottom"
              styleButtonProcessItemPosition="right bottom"
              allowFileSizeValidation
              allowImageEdit
              allowImageResize
              allowImageCrop
              credits={false}
              imagePreviewHeight={150}
              imageCropAspectRatio="1:1"
              maxFiles={1}
              maxFileSize="5MB"
              acceptedFileTypes={['image/*']}
              fileRenameFunction={(file) => `${Date.now()}-${file.name}`}
              className="outline outline-4 outline-yellow-500"
            />
          </FormControl>
        </Box>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Member Details
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' }, // Use responsive grid layout
            gap: 2,
          }}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                {...field}
                required
                label="Name"
                variant="outlined"
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                {...field}
                required
                type="email"
                label="Email"
                variant="outlined"
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                {...field}
                required
                type="text"
                label="Contact number"
                variant="outlined"
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="id_number"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                {...field}
                required
                type="text"
                label="ID Number"
                variant="outlined"
                error={invalid}
                helperText={error?.message}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  field.onChange(value);
                  const idNumberRegex =
                    /^(?<cent>[12])(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})\d{7}$/;
                  const match = value.match(idNumberRegex);

                  if (match) {
                    const { cent, year, month, day } = match.groups;
                    const fullYear = (+cent * 10 - 1) * 100 + +year;
                    const dateOfBirth = new Date(fullYear, +month - 1, +day);
                    setValue('date_of_birth', dateOfBirth);
                  } else {
                    setValue('date_of_birth', null);
                  }
                }}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                {...field}
                sx={{ gridColumn: 'span 2' }}
                required
                fullWidth
                label="Address"
                variant="outlined"
                rows={4}
                multiline
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <FormControl required error={invalid}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup {...field}>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />{' '}
          <Controller
            name="date_of_birth"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <FormControl required error={invalid}>
                <TextField
                  {...field}
                  disabled
                  type="text"
                  label="Date of Birth"
                  value={field?.value ? new Date(field.value).toLocaleDateString('en-GB') : ''}
                  variant="outlined"
                  error={invalid}
                  helperText={error?.message}
                />
              </FormControl>
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ mt: 2 }}>
            Membership
          </Typography>

          <Controller
            name="membership_start_date"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <FormControl required error={invalid}>
                <DatePicker
                  {...field}
                  label="Membership Start Date"
                  value={DateTime.fromJSDate(field?.value)}
                  onChange={(value) => field.onChange(value.toJSDate().toISOString())}
                />
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="membership_type"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <FormControl required error={invalid}>
                <Grid container spacing={2}>
                  {/* Basic Subscription Card */}
                  <Grid item xs={4}>
                    <Card elevation={field.value === EMembershipType.BASIC ? 8 : 1}>
                      <CardActionArea onClick={() => field.onChange(EMembershipType.BASIC)}>
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                          }}>
                          <LoyaltyIcon fontSize="large" />
                          <Typography gutterBottom variant="h5" component="div">
                            Basic
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Basic features for a great start.
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>

                  {/* Premium Subscription Card */}
                  <Grid item xs={4}>
                    <Card elevation={field.value === EMembershipType.PREMIUM ? 8 : 1}>
                      <CardActionArea onClick={() => field.onChange(EMembershipType.PREMIUM)}>
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                          }}>
                          <WorkspacePremiumIcon fontSize="large" />
                          <Typography gutterBottom variant="h5" component="div">
                            Premium
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            More features and flexibility.
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>

                  {/* VIP Subscription Card */}
                  <Grid item xs={4}>
                    <Card elevation={field.value === EMembershipType.VIP ? 8 : 1}>
                      <CardActionArea onClick={() => field.onChange(EMembershipType.VIP)}>
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            alignItems: 'center',
                          }}>
                          <RocketLaunchIcon fontSize="large" />
                          <Typography gutterBottom variant="h5" component="div">
                            VIP
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            All features and priority support.
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>
        <Controller
          name="is_newsletter_subscribe"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <FormControl required error={invalid}>
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Subscribe to newsletter"
              />

              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Box sx={{ my: 2 }}>
          <LoadingButton loading={loading} type="submit" variant="contained" color="primary">
            Submit{' '}
          </LoadingButton>
        </Box>
      </Paper>
    </Box>
  );
}
export default CreateMemberPage;
