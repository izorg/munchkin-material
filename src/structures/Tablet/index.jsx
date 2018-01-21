/* eslint-disable max-len */
import Home from './Home';

export default Home;

// import React from 'react';
// import connect from 'react-redux/es/connect/connect';
// import compose from 'recompose/compose';
// import AppBar from 'material-ui/AppBar';
// import Card, { CardActions, CardHeader } from 'material-ui/Card';
// import Grid from 'material-ui/Grid';
// import IconButton from 'material-ui/IconButton';
// import Toolbar from 'material-ui/Toolbar';
// import { withStyles } from 'material-ui/styles';
// import EditorModeEdit from 'material-ui-icons/ModeEdit';
// import ActionReorder from 'material-ui-icons/Reorder';
//
// import Counter from '../../components/Counter';
// import SwordCross from '../../components/icons/SwordCross';
// import PlayerAvatar from '../../components/player/Avatar';
// import Title from '../../components/Title';
// import Gender from '../../components/Gender';
//
// const mapStateToProps = state => ({
//   playerList: state.playerList,
//   players: state.players,
// });
//
// const styles = {
//   actions: {
//     justifyContent: 'space-between',
//   },
//
//   cardHeaderContent: {
//     overflow: 'hidden',
//   },
//
//   cardHeaderTitle: {
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//   },
//
//   content: {
//     display: 'flex',
//     padding: 8,
//   },
//
//   counter: {
//     flex: 1,
//   },
//
//   grid: {
//     overflowY: 'auto',
//     padding: 8,
//   },
//
//   tablet: {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100%',
//   },
// };

// eslint-disable-next-line react/prop-types
// const Tablet = ({ classes, playerList, players }) => (
//   <div className={classes.tablet}>
//     <AppBar color="primary" position="static">
//       <Toolbar>
//         <Title>Header</Title>
//       </Toolbar>
//     </AppBar>
//     <div className={classes.grid}>
//       <Grid container>
//         {playerList.map(playerId => (
//           <Grid item key={playerId} sm={4}>
//             <Card>
//               <CardHeader
//                 action={
//                   <IconButton>
//                     <Gender gender={players[playerId].gender} />
//                   </IconButton>
//                 }
//                 avatar={
//                   <PlayerAvatar
//                     color={players[playerId].color}
//                     name={players[playerId].name}
//                   />
//                 }
//                 classes={{
//                   content: classes.cardHeaderContent,
//                   title: classes.cardHeaderTitle,
//                 }}
//                 title={players[playerId].name}
//               />
//               <div className={classes.content}>
//                 <Counter compact className={classes.counter} title="Level" value={players[playerId].level} />
//                 <Counter compact className={classes.counter} title="Gear" value={players[playerId].gear} />
//                 <Counter compact className={classes.counter} title="Strength" value={players[playerId].level + players[playerId].gear} />
//               </div>
//               <CardActions className={classes.actions}>
//                 <IconButton>
//                   <EditorModeEdit />
//                 </IconButton>
//                 <IconButton>
//                   <SwordCross />
//                 </IconButton>
//                 <IconButton>
//                   <ActionReorder />
//                 </IconButton>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   </div>
// );
//
// export default compose(
//   connect(mapStateToProps),
//   withStyles(styles),
// )(Tablet);
