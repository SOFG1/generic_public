import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props} >
            <path fillRule="evenodd" clipRule="evenodd" d="M6.00909 0.978352C5.79767 1.10682 5.58688 1.23491 5.3719 1.34621C4.94216 1.60095 4.50764 1.84829 4.07311 2.09564C3.34782 2.50849 2.62254 2.92134 1.91953 3.36858C1.18422 3.96624 0.846374 4.92796 0.923592 5.85668C0.925222 6.48347 0.924375 7.11032 0.923528 7.73717C0.922149 8.75708 0.920771 9.777 0.930061 10.7967C1.02528 11.7935 1.71653 12.6396 2.60603 13.0566C3.14976 13.3687 3.69229 13.683 4.23481 13.9972C5.11703 14.5083 5.99925 15.0193 6.88668 15.5209C7.79774 15.9363 8.87627 15.7616 9.68221 15.1995C10.2233 14.8853 10.7656 14.5731 11.3079 14.261C12.1927 13.7517 13.0774 13.2424 13.9567 12.724C14.7725 12.1431 15.1597 11.1215 15.076 10.1427C15.0744 9.51606 15.0752 8.88938 15.0761 8.2627C15.0774 7.24262 15.0788 6.22255 15.0695 5.20271C14.9742 4.20589 14.2831 3.35968 13.3935 2.94283C12.85 2.631 12.3078 2.31702 11.7655 2.00304C10.8829 1.492 10.0003 0.980953 9.11262 0.479177C8.76574 0.318052 8.3804 0.25249 7.99977 0.251396C7.25043 0.224061 6.62705 0.602853 6.00909 0.978352ZM10.0192 9.3882C10.2335 9.21444 10.4975 9.12011 10.7692 9.12019C11.0127 9.12019 11.2506 9.19527 11.453 9.33592C11.6554 9.47657 11.8132 9.67649 11.9063 9.91039C11.9995 10.1443 12.0238 10.4017 11.9764 10.65C11.9289 10.8983 11.8116 11.1264 11.6395 11.3054C11.4674 11.4844 11.2481 11.6063 11.0093 11.6557C10.7706 11.7051 10.5231 11.6797 10.2982 11.5829C10.0733 11.486 9.88112 11.3219 9.74588 11.1114C9.61065 10.9009 9.53846 10.6534 9.53846 10.4002C9.53779 10.2255 9.57184 10.0526 9.63846 9.89222L8.75 9.17219C8.54641 9.33643 8.29827 9.42984 8.04077 9.43917C7.78327 9.44851 7.52948 9.37329 7.31539 9.2242L6.32692 10.1362C6.41514 10.3173 6.46125 10.5173 6.46154 10.7203C6.46147 11.0057 6.3697 11.2828 6.20081 11.5078C6.03192 11.7327 5.79558 11.8925 5.52937 11.9618C5.26315 12.031 4.98232 12.0057 4.7315 11.8899C4.48068 11.7742 4.27425 11.5745 4.14502 11.3228C4.01579 11.071 3.97117 10.7815 4.01825 10.5004C4.06532 10.2192 4.2014 9.96244 4.40485 9.77092C4.6083 9.5794 4.86746 9.46409 5.14114 9.4433C5.41483 9.42252 5.68734 9.49746 5.91539 9.65621L6.90385 8.74418C6.81563 8.56315 6.76952 8.36311 6.76923 8.16016C6.76873 7.96766 6.81038 7.77757 6.89101 7.60431C6.97164 7.43104 7.08915 7.27914 7.23462 7.16012L6.97308 6.5441C6.90549 6.55356 6.83742 6.5589 6.76923 6.5601C6.52581 6.5601 6.28785 6.48502 6.08545 6.34437C5.88305 6.20372 5.7253 6.0038 5.63215 5.7699C5.539 5.536 5.51462 5.27863 5.56211 5.03032C5.6096 4.78202 5.72682 4.55394 5.89895 4.37492C6.07107 4.1959 6.29037 4.07399 6.52912 4.0246C6.76787 3.97521 7.01533 4.00055 7.24023 4.09744C7.46512 4.19432 7.65734 4.35839 7.79258 4.56889C7.92782 4.77939 8 5.02688 8 5.28005C8.0005 5.47254 7.95885 5.66263 7.87822 5.8359C7.79759 6.00917 7.68008 6.16107 7.53462 6.28009L7.79615 6.89611C7.86375 6.88665 7.93181 6.88131 8 6.88011C8.20505 6.88012 8.40683 6.93358 8.58689 7.0356C8.76696 7.13762 8.91957 7.28495 9.03077 7.46413L9.54231 7.28812C9.53911 7.25891 9.53782 7.22951 9.53846 7.20012C9.53794 6.89349 9.6436 6.59691 9.83611 6.36467C10.0286 6.13243 10.2951 5.98005 10.5868 5.93541C10.8785 5.89078 11.1759 5.95687 11.4245 6.12161C11.6732 6.28634 11.8565 6.53869 11.9409 6.83249C12.0254 7.12628 12.0052 7.44187 11.8842 7.72149C11.7633 8.00112 11.5495 8.22609 11.2821 8.35523C11.0147 8.48437 10.7115 8.50904 10.4281 8.42474C10.1446 8.34044 9.8998 8.15279 9.73846 7.89615L9.22692 8.07215C9.23012 8.10136 9.23141 8.13076 9.23077 8.16016C9.23144 8.33485 9.19739 8.50781 9.13077 8.66817L10.0192 9.3882ZM11.1111 6.66796C11.0099 6.59763 10.8909 6.5601 10.7692 6.5601C10.606 6.5601 10.4495 6.62753 10.3341 6.74756C10.2187 6.86758 10.1538 7.03038 10.1538 7.20012C10.1538 7.3267 10.1899 7.45045 10.2576 7.5557C10.3252 7.66095 10.4213 7.74298 10.5337 7.79143C10.6462 7.83987 10.7699 7.85254 10.8893 7.82785C11.0087 7.80315 11.1183 7.74219 11.2044 7.65269C11.2904 7.56318 11.349 7.44914 11.3728 7.32498C11.3965 7.20083 11.3843 7.07214 11.3378 6.95519C11.2912 6.83824 11.2123 6.73829 11.1111 6.66796ZM6.25756 4.92447C6.18994 5.02972 6.15385 5.15346 6.15385 5.28005C6.15385 5.44979 6.21868 5.61259 6.33409 5.73261C6.4495 5.85264 6.60602 5.92007 6.76923 5.92007C6.89094 5.92007 7.00992 5.88254 7.11112 5.81221C7.21232 5.74188 7.2912 5.64192 7.33777 5.52498C7.38435 5.40803 7.39654 5.27934 7.37279 5.15519C7.34905 5.03103 7.29044 4.91699 7.20437 4.82748C7.11831 4.73797 7.00866 4.67702 6.88929 4.65232C6.76991 4.62763 6.64618 4.6403 6.53373 4.68874C6.42129 4.73719 6.32518 4.81922 6.25756 4.92447ZM4.88888 11.2524C4.99008 11.3227 5.10906 11.3603 5.23077 11.3603C5.39398 11.3603 5.55051 11.2928 5.66591 11.1728C5.78132 11.0528 5.84616 10.89 5.84616 10.7203C5.84616 10.5937 5.81006 10.4699 5.74244 10.3647C5.67482 10.2594 5.57871 10.1774 5.46627 10.1289C5.35382 10.0805 5.23009 10.0678 5.11071 10.0925C4.99134 10.1172 4.88169 10.1782 4.79563 10.2677C4.70957 10.3572 4.65096 10.4712 4.62721 10.5954C4.60347 10.7195 4.61565 10.8482 4.66223 10.9652C4.70881 11.0821 4.78768 11.1821 4.88888 11.2524ZM10.4273 10.9324C10.5285 11.0027 10.6475 11.0403 10.7692 11.0403C10.9324 11.0403 11.089 10.9728 11.2044 10.8528C11.3198 10.7328 11.3846 10.57 11.3846 10.4002C11.3846 10.2737 11.3485 10.1499 11.2809 10.0447C11.2133 9.93941 11.1172 9.85738 11.0047 9.80894C10.8923 9.76049 10.7685 9.74782 10.6492 9.77251C10.5298 9.79721 10.4202 9.85817 10.3341 9.94767C10.248 10.0372 10.1894 10.1512 10.1657 10.2754C10.1419 10.3995 10.1541 10.5282 10.2007 10.6452C10.2473 10.7621 10.3261 10.8621 10.4273 10.9324Z" fill="#1998A7"/>
        </Svg>
    );
};

export default Icon;