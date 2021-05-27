import React, { useState, useEffect, useCallback } from 'react';
import './ContextMenu.css';

const useContextMenu = () => {
	const [xPos, setXPos] = useState('0px');
	const [yPos, setYPos] = useState('0px');
	const [showMenu, setShowMenu] = useState(false);

	const handleContextMenu = useCallback(
		e => {
			e.preventDefault();
			setXPos(`${e.pageX}px`);
			setYPos(`${e.pageY}px`);
			setShowMenu(true);
		},
		[setXPos, setYPos]
	);

	const handleClick = useCallback(() => {
		showMenu && setShowMenu(false);
	}, [showMenu]);

	useEffect(() => {
		document.addEventListener('click', handleClick);
		document.addEventListener('contextmenu', handleContextMenu);
		return () => {
			document.addEventListener('click', handleClick);
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	});

	return { xPos, yPos, showMenu };
};

const ContextMenu = ({ menu }) => {
	const { xPos, yPos, showMenu } = useContextMenu();
	return (
		<>
			{showMenu ? (
				<div
					className="contextmenu-container"
					style={{
						top: yPos,
						left: xPos,
					}}
				>
					<li>
						<button className="context-menu--btn">
							<span className="context-menu--text">
								<i class="fas fa-pencil-alt"></i>Edit Channel
							</span>
						</button>
					</li>
					<li>
						<button className="context-menu--btn">
							<span className="context-menu--text">
								<i class="fas fa-trash-alt"></i>Delete Channel
							</span>
						</button>
					</li>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default ContextMenu;
