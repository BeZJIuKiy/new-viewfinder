import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 230,
    height: 400,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

export const TestImage = (props) => {
  const classes = useStyles();

  const [data, setData] = useState(props.boatImage);

  useEffect(() => {
    props.currentBoat 
      ? setData(props.boatImage.filter(item => item.typeVessel === props.currentBoat))
      : setData(props.boatImage);
    
  }, [props.currentBoat, props.boatImage]);

  const boatImage = data.map((tile, i) => {
    return (
    <GridListTile key={tile.id} cols={2} rows={2}>
      <img
        style={{ cursor: 'pointer' }}
        onClick={() => { 
          props.clickOnImage(true);
          // props.showSelectedImg(tile.id);
          props.showSelectedImg(i);
        }}
        src={tile.imageLink} alt={tile.typeVessel}
      />
      <GridListTileBar
        className={classes.titleBar}
        title={tile.typeVessel}
        titlePosition="top"
        actionPosition="left"
      />
    </GridListTile>
  )});

  // const boatImage = props.boatImage.map((tile) => (
  //   // <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
  //   <GridListTile key={tile.imageLink} cols={2} rows={2}>
  //     <img
  //       style={{ cursor: 'pointer' }}
  //       onClick={() => { props.clickOnImage(true) }}
  //       src={tile.imageLink} alt={tile.typeVessel}
  //     />
  //     <GridListTileBar
  //       className={classes.titleBar}
  //       title={tile.typeVessel}
  //       titlePosition="top"
  //       actionPosition="left"
  //     />
  //   </GridListTile>
  // ))


  // allTypeVessel = allTypeVessel.filter((item, pos) => (
  //   allTypeVessel.indexOf(item) === pos
  // ));

  return (
    <div className={classes.root}>
      <GridList cellHeight={70} spacing={1} className={classes.gridList}>
        {boatImage}
      </GridList>
    </div>
  );
}