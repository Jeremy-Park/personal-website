import Iconify from "@/components/Iconify";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
const MuiComponentShowcase = () => {
  return (
    <Stack spacing={3}>
      <Button variant="contained">hello</Button>

      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Avatar>A</Avatar>
              <Stack>
                <Typography variant="subtitle2">Donec Eget</Typography>
                <Typography color="text.secondary" variant="caption">
                  Pellentesque habitant morbi tristique
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={1} direction="row" alignItems="center">
              <Chip label="Commodo" />
              <Chip label="Convallis" />
              <Chip label="Magna" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title="Nulla mi lorem, condimentum sed"
          subheader="Ut sagittis sem nec luctus mattis. Donec ultricies, ligula vel auctor ultrices, nisl neque pellentesque."
        />
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="body1">
              Nulla condimentum ante a ligula aliquam sagittis. Suspendisse
              rutrum eros consectetur, feugiat lectus ac, pretium tortor. Nulla
              accumsan quam sed magna fermentum, non finibus augue tristique.
              Nullam imperdiet bibendum facilisis. Vivamus eget sollicitudin
              erat. Quisque urna massa, blandit quis nisl nec, semper placerat
              tellus. Cras vitae sodales orci, ac dictum lacus. Sed eget arcu
              vitae arcu porttitor semper id gravida urna. Mauris nunc lectus,
              maximus quis enim ac, rutrum feugiat felis. In erat justo, tempus
              vel rutrum vitae, vestibulum eleifend nunc. Suspendisse eget
              molestie lorem. Nam eget turpis convallis, vestibulum ligula at,
              dictum velit.
            </Typography>
            <Typography variant="body2">
              Duis pellentesque molestie tortor. Donec nec metus nisi. Fusce
              sollicitudin, elit at imperdiet pulvinar, lectus urna malesuada
              tortor, at cursus.
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button variant="contained">hello</Button>
        </CardActions>
      </Card>

      <Card>
        <Box>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Iconify icon="solar:inbox-bold" />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Iconify icon="solar:draft-bold" />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Trash" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText primary="Spam" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Card>
    </Stack>
  );
};

export default MuiComponentShowcase;
