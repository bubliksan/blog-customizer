import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { Select } from './ui/select';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { RadioGroup } from './ui/radio-group';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние страницы
	const [articleState, setArticleState] = useState(defaultArticleState);
	// Состояние формы
	const [formState, setFormState] = useState(defaultArticleState);

	const handleElementChange =
		(fieldName: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prev: ArticleStateType) => ({
				...prev,
				[fieldName]: value,
			}));
		};

	const handleApply = () => {
		setArticleState(formState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm reset={handleReset} apply={handleApply}>
				{{
					fontSelect: (
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							title='шрифт'
							onChange={handleElementChange('fontFamilyOption')}></Select>
					),
					fontSize: (
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							title='размер шрифта'
							onChange={handleElementChange('fontSizeOption')}></RadioGroup>
					),
					fontColor: (
						<Select
							selected={formState.fontColor}
							options={fontColors}
							title='цвет шрифта'
							onChange={handleElementChange('fontColor')}></Select>
					),
					separatorLine: <Separator></Separator>,
					backgroundColor: (
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title='цвет фона'
							onChange={handleElementChange('backgroundColor')}></Select>
					),
					contentWidth: (
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title='ширина контента'
							onChange={handleElementChange('contentWidth')}></Select>
					),
				}}
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
