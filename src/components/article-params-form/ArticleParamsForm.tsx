import { useState, useRef, ReactNode } from 'react';
import { Button } from 'src/ui/button';
import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type TFormChildren = {
	fontSelect: ReactNode;
	fontColor: ReactNode;
	fontSize: ReactNode;
	separatorLine: ReactNode;
	backgroundColor: ReactNode;
	contentWidth: ReactNode;
};

type TFormContentProps = {
	children: TFormChildren;
	apply: () => void;
	reset: () => void;
};

export const ArticleParamsForm = ({
	children,
	apply,
	reset,
}: TFormContentProps) => {
	const {
		fontSelect,
		fontColor,
		fontSize,
		separatorLine,
		backgroundColor,
		contentWidth,
	} = children;
	const [asideOpen, setAsideOpen] = useState(false);
	const rootRef = useRef<HTMLElement>(null);

	const handleCloseClick = () => {
		setAsideOpen(!asideOpen);
	};

	useOutsideClickClose({ asideOpen, handleCloseClick, rootRef });

	return (
		<>
			<ArrowButton isOpen={asideOpen} onClick={handleCloseClick} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: asideOpen,
				})}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase={true} family='open-sans'>
						Задайте параметры
					</Text>
					{fontSelect}
					{fontSize}
					{fontColor}
					{separatorLine}
					{backgroundColor}
					{contentWidth}
					<div
						className={styles.bottomContainer}
						onClick={(event) => event.preventDefault()}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={reset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={apply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
