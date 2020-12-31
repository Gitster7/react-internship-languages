/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import GetList from './getList';

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')`
  width: 300px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

export default function CustomizedHook() {

  const [list, setList] = useState([]);

  useEffect(() => {
   let mounted = true;
   GetList()
     .then(items => {
       if(mounted) {
         setList(items)
       }
     })
  return () => mounted = false;
 }, [])


  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: languages,
    getOptionLabel: (option) => option.name,
    code: (option) => option.code,
  });

  fetch('https://restcountries.eu/rest/v2/lang/es')
    .then(data => data.json())

  return (
    <NoSsr>
      <div>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>Languages</Label>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
            {value.map((option, index) => (
              <Tag label={option.name} {...getTagProps({ index })} />
            ))}

            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.name}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </NoSsr>
  );
}

const languages = [
    { code : 'ab', name : 'Abkhazian' },
    { code : 'aa', name : 'Afar' },
    { code : 'af', name : 'Afrikaans' },
    { code : 'ak', name : 'Akan' },
    { code : 'sq', name : 'Albanian' },
    { code : 'am', name : 'Amharic' },
    { code : 'ar', name : 'Arabic' },
    { code : 'an', name : 'Aragonese' },
    { code : 'hy', name : 'Armenian' },
    { code : 'as', name : 'Assamese' },
    { code : 'av', name : 'Avaric' },
    { code : 'ae', name : 'Avestan' },
    { code : 'ay', name : 'Aymara' },
    { code : 'az', name : 'Azerbaijani' },
    { code : 'bm', name : 'Bambara' },
    { code : 'ba', name : 'Bashkir' },
    { code : 'eu', name : 'Basque' },
    { code : 'be', name : 'Belarusian' },
    { code : 'bn', name : 'Bengali' },
    { code : 'bh', name : 'Bihari languages' },
    { code : 'bi', name : 'Bislama' },
    { code : 'bs', name : 'Bosnian' },
    { code : 'br', name : 'Breton' },
    { code : 'bg', name : 'Bulgarian' },
    { code : 'my', name : 'Burmese' },
    { code : 'ca', name : 'Catalan, Valencian' },
    { code : 'km', name : 'Central Khmer' },
    { code : 'ch', name : 'Chamorro' },
    { code : 'ce', name : 'Chechen' },
    { code : 'ny', name : 'Chichewa, Chewa, Nyanja' },
    { code : 'zh', name : 'Chinese' },
    { code : 'cu', name : 'Church Slavonic, Old Bulgarian, Old Church Slavonic' },
    { code : 'cv', name : 'Chuvash' },
    { code : 'kw', name : 'Cornish' },
    { code : 'co', name : 'Corsican' },
    { code : 'cr', name : 'Cree' },
    { code : 'hr', name : 'Croatian' },
    { code : 'cs', name : 'Czech' },
    { code : 'da', name : 'Danish' },
    { code : 'dv', name : 'Divehi, Dhivehi, Maldivian' },
    { code : 'nl', name : 'Dutch, Flemish' },
    { code : 'dz', name : 'Dzongkha' },
    { code : 'en', name : 'English' },
    { code : 'eo', name : 'Esperanto' },
    { code : 'et', name : 'Estonian' },
    { code : 'ee', name : 'Ewe' },
    { code : 'fo', name : 'Faroese' },
    { code : 'fj', name : 'Fijian' },
    { code : 'fi', name : 'Finnish' },
    { code : 'fr', name : 'French' },
    { code : 'ff', name : 'Fulah' },
    { code : 'gd', name : 'Gaelic, Scottish Gaelic' },
    { code : 'gl', name : 'Galician' },
    { code : 'lg', name : 'Ganda' },
    { code : 'ka', name : 'Georgian' },
    { code : 'de', name : 'German' },
    { code : 'ki', name : 'Gikuyu, Kikuyu' },
    { code : 'el', name : 'Greek (Modern)' },
    { code : 'kl', name : 'Greenlandic, Kalaallisut' },
    { code : 'gn', name : 'Guarani' },
    { code : 'gu', name : 'Gujarati' },
    { code : 'ht', name : 'Haitian, Haitian Creole' },
    { code : 'ha', name : 'Hausa' },
    { code : 'he', name : 'Hebrew' },
    { code : 'hz', name : 'Herero' },
    { code : 'hi', name : 'Hindi' },
    { code : 'ho', name : 'Hiri Motu' },
    { code : 'hu', name : 'Hungarian' },
    { code : 'is', name : 'Icelandic' },
    { code : 'io', name : 'Ido' },
    { code : 'ig', name : 'Igbo' },
    { code : 'id', name : 'Indonesian' },
    { code : 'ia', name : 'Interlingua (International Auxiliary Language Association)' },
    { code : 'ie', name : 'Interlingue' },
    { code : 'iu', name : 'Inuktitut' },
    { code : 'ik', name : 'Inupiaq' },
    { code : 'ga', name : 'Irish' },
    { code : 'it', name : 'Italian' },
    { code : 'ja', name : 'Japanese' },
    { code : 'jv', name : 'Javanese' },
    { code : 'kn', name : 'Kannada' },
    { code : 'kr', name : 'Kanuri' },
    { code : 'ks', name : 'Kashmiri' },
    { code : 'kk', name : 'Kazakh' },
    { code : 'rw', name : 'Kinyarwanda' },
    { code : 'kv', name : 'Komi' },
    { code : 'kg', name : 'Kongo' },
    { code : 'ko', name : 'Korean' },
    { code : 'kj', name : 'Kwanyama, Kuanyama' },
    { code : 'ku', name : 'Kurdish' },
    { code : 'ky', name : 'Kyrgyz' },
    { code : 'lo', name : 'Lao' },
    { code : 'la', name : 'Latin' },
    { code : 'lv', name : 'Latvian' },
    { code : 'lb', name : 'Letzeburgesch, Luxembourgish' },
    { code : 'li', name : 'Limburgish, Limburgan, Limburger' },
    { code : 'ln', name : 'Lingala' },
    { code : 'lt', name : 'Lithuanian' },
    { code : 'lu', name : 'Luba-Katanga' },
    { code : 'mk', name : 'Macedonian' },
    { code : 'mg', name : 'Malagasy' },
    { code : 'ms', name : 'Malay' },
    { code : 'ml', name : 'Malayalam' },
    { code : 'mt', name : 'Maltese' },
    { code : 'gv', name : 'Manx' },
    { code : 'mi', name : 'Maori' },
    { code : 'mr', name : 'Marathi' },
    { code : 'mh', name : 'Marshallese' },
    { code : 'ro', name : 'Moldovan, Moldavian, Romanian' },
    { code : 'mn', name : 'Mongolian' },
    { code : 'na', name : 'Nauru' },
    { code : 'nv', name : 'Navajo, Navaho' },
    { code : 'nd', name : 'Northern Ndebele' },
    { code : 'ng', name : 'Ndonga' },
    { code : 'ne', name : 'Nepali' },
    { code : 'se', name : 'Northern Sami' },
    { code : 'no', name : 'Norwegian' },
    { code : 'nb', name : 'Norwegian Bokmål' },
    { code : 'nn', name : 'Norwegian Nynorsk' },
    { code : 'ii', name : 'Nuosu, Sichuan Yi' },
    { code : 'oc', name : 'Occitan (post 1500)' },
    { code : 'oj', name : 'Ojibwa' },
    { code : 'or', name : 'Oriya' },
    { code : 'om', name : 'Oromo' },
    { code : 'os', name : 'Ossetian, Ossetic' },
    { code : 'pi', name : 'Pali' },
    { code : 'pa', name : 'Panjabi, Punjabi' },
    { code : 'ps', name : 'Pashto, Pushto' },
    { code : 'fa', name : 'Persian' },
    { code : 'pl', name : 'Polish' },
    { code : 'pt', name : 'Portuguese' },
    { code : 'qu', name : 'Quechua' },
    { code : 'rm', name : 'Romansh' },
    { code : 'rn', name : 'Rundi' },
    { code : 'ru', name : 'Russian' },
    { code : 'sm', name : 'Samoan' },
    { code : 'sg', name : 'Sango' },
    { code : 'sa', name : 'Sanskrit' },
    { code : 'sc', name : 'Sardinian' },
    { code : 'sr', name : 'Serbian' },
    { code : 'sn', name : 'Shona' },
    { code : 'sd', name : 'Sindhi' },
    { code : 'si', name : 'Sinhala, Sinhalese' },
    { code : 'sk', name : 'Slovak' },
    { code : 'sl', name : 'Slovenian' },
    { code : 'so', name : 'Somali' },
    { code : 'st', name : 'Sotho, Southern' },
    { code : 'nr', name : 'South Ndebele' },
    { code : 'es', name : 'Spanish, Castilian' },
    { code : 'su', name : 'Sundanese' },
    { code : 'sw', name : 'Swahili' },
    { code : 'ss', name : 'Swati' },
    { code : 'sv', name : 'Swedish' },
    { code : 'tl', name : 'Tagalog' },
    { code : 'ty', name : 'Tahitian' },
    { code : 'tg', name : 'Tajik' },
    { code : 'ta', name : 'Tamil' },
    { code : 'tt', name : 'Tatar' },
    { code : 'te', name : 'Telugu' },
    { code : 'th', name : 'Thai' },
    { code : 'bo', name : 'Tibetan' },
    { code : 'ti', name : 'Tigrinya' },
    { code : 'to', name : 'Tonga (Tonga Islands)' },
    { code : 'ts', name : 'Tsonga' },
    { code : 'tn', name : 'Tswana' },
    { code : 'tr', name : 'Turkish' },
    { code : 'tk', name : 'Turkmen' },
    { code : 'tw', name : 'Twi' },
    { code : 'ug', name : 'Uighur, Uyghur' },
    { code : 'uk', name : 'Ukrainian' },
    { code : 'ur', name : 'Urdu' },
    { code : 'uz', name : 'Uzbek' },
    { code : 've', name : 'Venda' },
    { code : 'vi', name : 'Vietnamese' },
    { code : 'vo', name : 'Volap_k' },
    { code : 'wa', name : 'Walloon' },
    { code : 'cy', name : 'Welsh' },
    { code : 'fy', name : 'Western Frisian' },
    { code : 'wo', name : 'Wolof' },
    { code : 'xh', name : 'Xhosa' },
    { code : 'yi', name : 'Yiddish' },
    { code : 'yo', name : 'Yoruba' },
    { code : 'za', name : 'Zhuang, Chuang' },
    { code : 'zu', name : 'Zulu' }
];
