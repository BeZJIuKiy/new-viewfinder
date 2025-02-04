import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {isEmptyArray} from "formik";


function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{id: 'typeError', numeric: false, disablePadding: true, label: 'Type'},
	{id: 'typeVessel', numeric: false, disablePadding: true, label: 'Type Vessel'},
	{id: 'date', numeric: false, disablePadding: false, label: 'Date (YYYY-MM-DD)'},
	{id: 'time', numeric: false, disablePadding: false, label: 'Time (HH:MM:SS)'},
	{id: 'timezone', numeric: false, disablePadding: false, label: 'Timezone'},
	{id: 'description', numeric: false, disablePadding: false, label: 'Description'},
];

function EnhancedTableHead(props) {
	const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>

				{/*<TableCell align="center">*/}
				{/*	<FormControlLabel*/}
				{/*		control={<Checkbox icon={<RadioButtonUncheckedIcon fontSize="small"/>}*/}
				{/*		                   checkedIcon={<RadioButtonCheckedIcon fontSize="small"/>}*/}
				{/*		                   name="checkedH"/>*/}
				{/*		}*/}
				{/*	/>*/}
				{/*</TableCell>*/}

				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{'aria-label': 'select all desserts'}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: '1 1 100%',
	},
	editIcons: {
		display: 'flex'
	},
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const {numSelected} = props;
	const {selectedObjects: {camera, event}} = useSelector(state => state.ports);

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography className={classes.title}
				            variant="h6"
				            id="tableTitle"
				            component="div"
				>
					{/* Events - это заголовок таблицы */}
					{`ALL EVENTS ${typeof event.id !== "undefined"
						? (event.typeVessel)
						: (camera.description)}`}
				</Typography>
			)}

			{numSelected === 1 ? (
				<Tooltip
					title="Add ship"
					onClick={() => alert("Add ship")}
				>
					<IconButton aria-label="Add ship">
						<AddCircleIcon color="secondary"/>
					</IconButton>
				</Tooltip>
			) : ('')
			}

			{numSelected >= 1 ? (
				<Tooltip
					title="Delete"
					onClick={() => alert("Delete")}
				>
					<IconButton aria-label="delete">
						<DeleteIcon/>
					</IconButton>
				</Tooltip>
			) : ('')
			}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

export const BoatEvents = () => {
	const classes = useStyles();

	const {
		selectedObjects: {
			camera, event,
			shipImage: {id: imageId},
		},
	} = useSelector(state => state.ports);
	const {SelectedImageVisibleAction, SelectedShipImageIdAction} = useActions();

	const [data, setData] = useState(camera.events);
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('typeVessel');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	// const [dense, setDense] = React.useState(false);
	const [dense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	useEffect(() => {
		setData(Number.isInteger(event.id)
			? camera.events.filter(e => e.typeVessel === event.typeVessel)
			: camera.events
		);

		setSelected([]);
	}, [event, camera]);

	useEffect(() => {
		if (imageId >= 0) setSelected([imageId]);
	}, [imageId])

	const rows = data.map(row => {
		return ({
			id: row.id,
			typeError: row.typeError,
			typeVessel: row.typeVessel,
			date: row.date,
			time: row.time,
			timezone: row.timezone,
			description: row.description,
		})
	});

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}

		setSelected([]);
	};

	const handleClick = (event, id, index) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		if (newSelected.length === 1) {
			SelectedShipImageIdAction(newSelected[0]);
			SelectedImageVisibleAction(true);
		} else {
			SelectedShipImageIdAction(-1);
			SelectedImageVisibleAction(false);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const handleChangeDense = (event) => {
	//   setDense(event.target.checked);
	// };

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar
					numSelected={selected.length}
				/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {

									const {id, typeError, typeVessel, date, time, timezone, description} = row;
									const isItemSelected = isSelected(id);
									const labelId = `enhanced-table-checkbox-${index}`;
									const notifType = `events__type__notification ${typeError.toLowerCase()}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, id, (index + page * rowsPerPage))}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={id}
											selected={isItemSelected}
										>
											{/*<TableCell align="center">*/}
											{/*	<FormControlLabel*/}
											{/*		// onChange={() => setSelected([])}*/}
											{/*		control={<Checkbox icon={<RadioButtonUncheckedIcon fontSize="small"/>}*/}
											{/*		                   checkedIcon={<RadioButtonCheckedIcon fontSize="small"/>}*/}
											{/*		                   name="checkedH"/>*/}
											{/*		}*/}
											{/*	/>*/}
											{/*</TableCell>*/}

											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													inputProps={{'aria-labelledby': labelId}}
												/>
											</TableCell>

											<TableCell component="th" id={labelId} scope="row" padding="none"
											           align="center"
											           className={notifType}>{typeError}</TableCell>
											<TableCell align="left">{typeVessel}</TableCell>
											<TableCell align="left">{date}</TableCell>
											<TableCell align="left">{time}</TableCell>
											<TableCell align="left">{timezone}</TableCell>
											<TableCell align="left">{description}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
									<TableCell colSpan={6}/>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			{/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
		</div>
	);
}