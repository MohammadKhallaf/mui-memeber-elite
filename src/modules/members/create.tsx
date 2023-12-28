import LoyaltyIcon from '@mui/icons-material/Loyalty';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

import { DatePicker } from '@mui/x-date-pickers';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

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
function CreateMemberPage(): React.ReactElement {
  const [selectedSubscription, setSelectedSubscription] = useState('');

  const handleSelectSubscription = (value) => {
    setSelectedSubscription(value);
    // Perform additional actions if necessary, such as updating state or making API calls
  };

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
      <Paper sx={{ px: 3, pb: 5, pt: 0, position: 'relative', overflow: 'hidden' }}>
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
          <TextField required label="Name" variant="outlined" />

          <TextField required label="Email" type="email" variant="outlined" />

          <TextField required label="Phone Number" variant="outlined" />

          <TextField required label="ID" type="number" variant="outlined" />

          <TextField
            required
            fullWidth
            sx={{ gridColumn: 'span 2' }}
            label="Address"
            variant="outlined"
            rows={4}
            multiline
          />

          <FormControl required>
            <FormLabel>Gender</FormLabel>
            <RadioGroup>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ mt: 2 }}>
            Membership
          </Typography>

          <DatePicker label="Membership Start Date" />

          <Grid container spacing={2}>
            {/* Basic Subscription Card */}
            <Grid item xs={4}>
              <Card
                elevation={selectedSubscription === 'basic' ? 8 : 1}
                onClick={() => handleSelectSubscription('basic')}>
                <CardActionArea onClick={() => handleSelectSubscription('basic')}>
                  <CardContent
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
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
              <Card
                elevation={selectedSubscription === 'premium' ? 8 : 1}
                onClick={() => handleSelectSubscription('premium')}>
                <CardActionArea>
                  <CardContent
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
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
              <Card
                elevation={selectedSubscription === 'vip' ? 8 : 1}
                onClick={() => handleSelectSubscription('vip')}>
                <CardActionArea>
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
        </Box>
      </Paper>
    </Box>
  );
}
export default CreateMemberPage;
