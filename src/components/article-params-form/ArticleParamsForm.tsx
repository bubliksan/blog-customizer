import { useState, useRef, SyntheticEvent } from 'react';
import { Button } from 'src/ui/button';
import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type TFormContentProps = {
	stateApply: ({}: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ stateApply }: TFormContentProps) => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [asideOpen, setAsideOpen] = useState(false);
	const rootRef = useRef<HTMLElement>(null);

	const handleElementChange =
		(fieldName: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prev: ArticleStateType) => ({
				...prev,
				[fieldName]: value,
			}));
		};

	const handleReset = () => {
		stateApply(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const handleApply = (evt: SyntheticEvent) => {
		evt.preventDefault();
		stateApply(formState);
	};

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
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true} family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleElementChange('fontFamilyOption')}></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={handleElementChange('fontSizeOption')}></RadioGroup>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={handleElementChange('fontColor')}></Select>
					<Separator></Separator>
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={handleElementChange('backgroundColor')}></Select>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={handleElementChange('contentWidth')}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
