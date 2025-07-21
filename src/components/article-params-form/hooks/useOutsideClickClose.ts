import { useEffect } from 'react';

type HandleOutsideClickClose = {
	asideOpen: boolean;
	handleCloseClick: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideClickClose = ({
	asideOpen,
	handleCloseClick,
	rootRef,
}: HandleOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				asideOpen && handleCloseClick?.();
			}
		};
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [asideOpen, handleCloseClick]);
};
