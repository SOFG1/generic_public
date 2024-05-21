import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '..';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="39" height="39" viewBox="0 0 39 39" fill="none" {...props} >
            <mask id="path-2-outside-1_2996_33735" maskUnits="userSpaceOnUse" x="8" y="7" width="23" height="25" fill="black">
                <rect fill="white" x="8" y="7" width="23" height="25" />
                <path
                    d="M21.0377 8C21.7361 8.12061 22.4117 8.31577 23.0369 8.64973C23.4051 8.8461 23.7641 9.06005 24.1188 9.27945C24.4483 9.4831 24.768 9.7025 25.0913 9.91645C25.9692 10.4983 26.3331 11.4838 26.0417 12.4844C26.0239 12.5457 26.0122 12.6087 25.9956 12.6802C26.6214 12.8226 27.1605 13.096 27.6019 13.5518C28.3802 14.3542 28.6402 15.2979 28.4035 16.3755C28.3703 16.5264 28.3863 16.6264 28.4927 16.744C29.3877 17.735 29.5279 19.1611 28.8431 20.3024C28.7582 20.4436 28.749 20.543 28.8375 20.6909C29.6846 22.1012 29.2586 23.8874 27.8644 24.7862C27.739 24.8668 27.6917 24.948 27.699 25.1007C27.7765 26.6554 26.8925 27.9821 25.4177 28.5536C25.3298 28.5876 25.2425 28.6603 25.1884 28.7373C24.1926 30.1537 22.5629 30.6604 20.9351 30.0361C20.2502 29.7737 19.7197 29.31 19.3214 28.7015C19.263 28.6124 19.2107 28.5197 19.1609 28.4373C18.923 28.7312 18.722 29.0379 18.4644 29.2876C16.8667 30.8355 14.366 30.5792 13.0977 28.7548C13.0326 28.6615 12.9238 28.5761 12.8162 28.5354C11.4177 28.0045 10.5023 26.6457 10.5742 25.165C10.5841 24.9626 10.5214 24.8565 10.3548 24.7498C9.04047 23.9074 8.60646 22.0776 9.40378 20.7466C9.50152 20.5836 9.53533 20.4654 9.42345 20.2817C8.75277 19.1787 8.89047 17.7489 9.75356 16.7767C9.87159 16.6434 9.90971 16.5331 9.86791 16.3537C9.49107 14.753 10.466 13.1663 12.0797 12.7323C12.1431 12.7154 12.2058 12.6978 12.234 12.6899C12.2027 12.3329 12.1332 11.9887 12.1498 11.6486C12.1842 10.9304 12.5316 10.3601 13.1316 9.95706C13.7199 9.56128 14.3155 9.17338 14.9278 8.81519C15.6151 8.41335 16.3559 8.13334 17.1563 8.0303C17.1839 8.02667 17.2104 8.01091 17.2374 8.00061C17.4433 8.00061 17.6499 8.00061 17.8558 8.00061C18.1527 8.13273 18.4589 8.24789 18.7429 8.40365C18.896 8.4879 19.0103 8.64003 19.1535 8.77216C19.4726 8.34123 19.9183 8.12485 20.4187 8H21.0371H21.0377ZM19.5009 12.9475C19.8605 12.8408 20.2023 12.719 20.5539 12.642C20.8404 12.5796 21.0377 12.7238 21.0605 12.9554C21.082 13.176 20.924 13.3166 20.6381 13.3584C20.4808 13.3814 20.3154 13.4111 20.1746 13.4796C19.6748 13.7227 19.4984 14.1518 19.499 14.6785C19.5009 18.5326 19.499 22.3867 19.5009 26.2408C19.5009 26.5305 19.496 26.8226 19.5236 27.1105C19.6398 28.2979 20.4968 29.2561 21.6561 29.5143C22.8119 29.7713 23.9866 29.2791 24.6173 28.2633C24.7311 28.0803 24.8719 27.9633 25.079 27.89C26.4321 27.4118 27.1452 26.2269 26.9294 24.8274C26.8962 24.6135 26.9632 24.4583 27.1581 24.3577C27.2294 24.3207 27.3013 24.2837 27.372 24.245C28.4791 23.6298 28.8781 22.1443 28.2222 21.0848C28.2087 21.0897 28.1933 21.0915 28.1822 21.0994C28.1343 21.1333 28.0888 21.1697 28.0414 21.2042C27.5189 21.5873 26.9355 21.8006 26.2821 21.817C25.9907 21.8242 25.8198 21.6994 25.8124 21.4757C25.805 21.2618 25.9612 21.1248 26.2366 21.1036C26.2661 21.1012 26.2956 21.1006 26.3245 21.0981C27.2909 21.0078 27.9781 20.5169 28.3623 19.6496C28.7558 18.7623 28.5222 17.7416 27.7949 17.0774C27.5872 16.8877 27.5189 16.6967 27.6234 16.441C27.6456 16.3876 27.6572 16.3301 27.6738 16.2743C28.071 14.9276 27.029 13.4536 25.612 13.3596C24.2141 13.2669 23.1057 14.2306 23.0258 15.6094C23.0098 15.8888 22.8598 16.0543 22.636 16.0404C22.4154 16.027 22.282 15.8537 22.2912 15.5925C22.3447 14.0815 23.4967 12.8342 25.0089 12.659C25.1528 12.6426 25.2327 12.5844 25.285 12.4547C25.5056 11.9062 25.4583 11.3844 25.1042 10.9086C24.4255 9.99706 23.0535 10.068 22.4627 11.0371C22.2807 11.3359 22.0945 11.4183 21.8836 11.2941C21.6746 11.171 21.6561 10.9595 21.835 10.6662C22.1307 10.1801 22.5567 9.8516 23.0959 9.66128C23.1444 9.64431 23.1912 9.6231 23.2625 9.59401C22.569 9.1946 21.8818 8.87458 21.1133 8.75397C20.1949 8.61033 19.531 9.06732 19.5082 9.9116C19.4806 10.9341 19.5015 11.9571 19.5015 12.9475H19.5009ZM10.0486 21.063C9.99331 21.1818 9.93737 21.283 9.8968 21.3897C9.46218 22.5261 9.922 23.7195 11.0162 24.3025C11.347 24.4789 11.3605 24.5456 11.3334 24.9086C11.3101 25.2165 11.2996 25.5377 11.3611 25.8371C11.5713 26.8566 12.1953 27.5427 13.1912 27.8881C13.3977 27.9603 13.5404 28.076 13.6553 28.2591C14.1785 29.09 14.9401 29.5288 15.9342 29.5719C17.0911 29.6216 18.1767 28.9033 18.5941 27.8124C19.0054 26.7372 18.6673 25.4602 17.7489 24.7735C17.4507 24.5504 17.088 24.408 16.7468 24.245C16.493 24.1237 16.3909 23.9171 16.512 23.7074C16.6073 23.5431 16.7733 23.4928 17.0167 23.5661C17.6431 23.7552 18.178 24.0886 18.6138 24.5722C18.6544 24.6171 18.6704 24.6838 18.698 24.7407C18.7202 24.7195 18.7423 24.6989 18.765 24.6777C18.7687 24.6571 18.7755 24.6371 18.7755 24.6165C18.7755 21.7855 18.7786 18.955 18.7699 16.124C18.7699 15.9276 18.7165 15.7161 18.631 15.5385C18.4263 15.1143 18.0519 14.9239 17.5853 14.8833C17.3444 14.8621 17.2011 14.7076 17.2134 14.5076C17.2263 14.2954 17.396 14.1475 17.645 14.1797C17.8896 14.2112 18.1318 14.2748 18.3679 14.3469C18.5025 14.3882 18.623 14.4748 18.7515 14.5415C18.7632 14.5136 18.7736 14.5009 18.7736 14.4882C18.7749 12.9639 18.789 11.4395 18.7693 9.91524C18.7595 9.16672 18.2111 8.69821 17.4556 8.73155C16.5606 8.77155 15.7897 9.15581 15.0268 9.58249C15.0495 9.60371 15.0582 9.61704 15.0711 9.6225C15.1049 9.63644 15.1405 9.64553 15.175 9.65765C15.7534 9.86008 16.1997 10.2183 16.4923 10.7535C16.6202 10.9874 16.5741 11.1947 16.3786 11.2989C16.1887 11.4001 16.0024 11.3341 15.861 11.1147C15.8413 11.0844 15.8235 11.0523 15.8044 11.0213C15.3778 10.3268 14.492 10.0662 13.7635 10.4201C13.0123 10.7856 12.673 11.6262 12.9631 12.3875C13.0295 12.562 13.1266 12.6426 13.3277 12.6638C14.7741 12.816 16.0067 14.1978 15.987 15.6282C15.9833 15.8876 15.8081 16.0622 15.5794 16.0337C15.3711 16.0082 15.2641 15.8634 15.2493 15.59C15.2051 14.7682 14.8166 14.1391 14.1231 13.6984C13.3363 13.1984 12.2328 13.2396 11.524 13.7742C10.6628 14.4233 10.313 15.3773 10.6234 16.3282C10.7322 16.6616 10.6849 16.8816 10.423 17.1337C9.21444 18.2968 9.65951 20.3448 11.2412 20.9315C11.505 21.0291 11.797 21.0575 12.0791 21.1006C12.3176 21.1369 12.4676 21.2666 12.4639 21.4685C12.4596 21.6806 12.2967 21.8188 12.0429 21.8145C11.9033 21.8121 11.7631 21.8012 11.6254 21.7818C11.0347 21.6982 10.5208 21.4448 10.0499 21.0606L10.0486 21.063Z" />
            </mask>
            <path
                d="M21.0377 8C21.7361 8.12061 22.4117 8.31577 23.0369 8.64973C23.4051 8.8461 23.7641 9.06005 24.1188 9.27945C24.4483 9.4831 24.768 9.7025 25.0913 9.91645C25.9692 10.4983 26.3331 11.4838 26.0417 12.4844C26.0239 12.5457 26.0122 12.6087 25.9956 12.6802C26.6214 12.8226 27.1605 13.096 27.6019 13.5518C28.3802 14.3542 28.6402 15.2979 28.4035 16.3755C28.3703 16.5264 28.3863 16.6264 28.4927 16.744C29.3877 17.735 29.5279 19.1611 28.8431 20.3024C28.7582 20.4436 28.749 20.543 28.8375 20.6909C29.6846 22.1012 29.2586 23.8874 27.8644 24.7862C27.739 24.8668 27.6917 24.948 27.699 25.1007C27.7765 26.6554 26.8925 27.9821 25.4177 28.5536C25.3298 28.5876 25.2425 28.6603 25.1884 28.7373C24.1926 30.1537 22.5629 30.6604 20.9351 30.0361C20.2502 29.7737 19.7197 29.31 19.3214 28.7015C19.263 28.6124 19.2107 28.5197 19.1609 28.4373C18.923 28.7312 18.722 29.0379 18.4644 29.2876C16.8667 30.8355 14.366 30.5792 13.0977 28.7548C13.0326 28.6615 12.9238 28.5761 12.8162 28.5354C11.4177 28.0045 10.5023 26.6457 10.5742 25.165C10.5841 24.9626 10.5214 24.8565 10.3548 24.7498C9.04047 23.9074 8.60646 22.0776 9.40378 20.7466C9.50152 20.5836 9.53533 20.4654 9.42345 20.2817C8.75277 19.1787 8.89047 17.7489 9.75356 16.7767C9.87159 16.6434 9.90971 16.5331 9.86791 16.3537C9.49107 14.753 10.466 13.1663 12.0797 12.7323C12.1431 12.7154 12.2058 12.6978 12.234 12.6899C12.2027 12.3329 12.1332 11.9887 12.1498 11.6486C12.1842 10.9304 12.5316 10.3601 13.1316 9.95706C13.7199 9.56128 14.3155 9.17338 14.9278 8.81519C15.6151 8.41335 16.3559 8.13334 17.1563 8.0303C17.1839 8.02667 17.2104 8.01091 17.2374 8.00061C17.4433 8.00061 17.6499 8.00061 17.8558 8.00061C18.1527 8.13273 18.4589 8.24789 18.7429 8.40365C18.896 8.4879 19.0103 8.64003 19.1535 8.77216C19.4726 8.34123 19.9183 8.12485 20.4187 8H21.0371H21.0377ZM19.5009 12.9475C19.8605 12.8408 20.2023 12.719 20.5539 12.642C20.8404 12.5796 21.0377 12.7238 21.0605 12.9554C21.082 13.176 20.924 13.3166 20.6381 13.3584C20.4808 13.3814 20.3154 13.4111 20.1746 13.4796C19.6748 13.7227 19.4984 14.1518 19.499 14.6785C19.5009 18.5326 19.499 22.3867 19.5009 26.2408C19.5009 26.5305 19.496 26.8226 19.5236 27.1105C19.6398 28.2979 20.4968 29.2561 21.6561 29.5143C22.8119 29.7713 23.9866 29.2791 24.6173 28.2633C24.7311 28.0803 24.8719 27.9633 25.079 27.89C26.4321 27.4118 27.1452 26.2269 26.9294 24.8274C26.8962 24.6135 26.9632 24.4583 27.1581 24.3577C27.2294 24.3207 27.3013 24.2837 27.372 24.245C28.4791 23.6298 28.8781 22.1443 28.2222 21.0848C28.2087 21.0897 28.1933 21.0915 28.1822 21.0994C28.1343 21.1333 28.0888 21.1697 28.0414 21.2042C27.5189 21.5873 26.9355 21.8006 26.2821 21.817C25.9907 21.8242 25.8198 21.6994 25.8124 21.4757C25.805 21.2618 25.9612 21.1248 26.2366 21.1036C26.2661 21.1012 26.2956 21.1006 26.3245 21.0981C27.2909 21.0078 27.9781 20.5169 28.3623 19.6496C28.7558 18.7623 28.5222 17.7416 27.7949 17.0774C27.5872 16.8877 27.5189 16.6967 27.6234 16.441C27.6456 16.3876 27.6572 16.3301 27.6738 16.2743C28.071 14.9276 27.029 13.4536 25.612 13.3596C24.2141 13.2669 23.1057 14.2306 23.0258 15.6094C23.0098 15.8888 22.8598 16.0543 22.636 16.0404C22.4154 16.027 22.282 15.8537 22.2912 15.5925C22.3447 14.0815 23.4967 12.8342 25.0089 12.659C25.1528 12.6426 25.2327 12.5844 25.285 12.4547C25.5056 11.9062 25.4583 11.3844 25.1042 10.9086C24.4255 9.99706 23.0535 10.068 22.4627 11.0371C22.2807 11.3359 22.0945 11.4183 21.8836 11.2941C21.6746 11.171 21.6561 10.9595 21.835 10.6662C22.1307 10.1801 22.5567 9.8516 23.0959 9.66128C23.1444 9.64431 23.1912 9.6231 23.2625 9.59401C22.569 9.1946 21.8818 8.87458 21.1133 8.75397C20.1949 8.61033 19.531 9.06732 19.5082 9.9116C19.4806 10.9341 19.5015 11.9571 19.5015 12.9475H19.5009ZM10.0486 21.063C9.99331 21.1818 9.93737 21.283 9.8968 21.3897C9.46218 22.5261 9.922 23.7195 11.0162 24.3025C11.347 24.4789 11.3605 24.5456 11.3334 24.9086C11.3101 25.2165 11.2996 25.5377 11.3611 25.8371C11.5713 26.8566 12.1953 27.5427 13.1912 27.8881C13.3977 27.9603 13.5404 28.076 13.6553 28.2591C14.1785 29.09 14.9401 29.5288 15.9342 29.5719C17.0911 29.6216 18.1767 28.9033 18.5941 27.8124C19.0054 26.7372 18.6673 25.4602 17.7489 24.7735C17.4507 24.5504 17.088 24.408 16.7468 24.245C16.493 24.1237 16.3909 23.9171 16.512 23.7074C16.6073 23.5431 16.7733 23.4928 17.0167 23.5661C17.6431 23.7552 18.178 24.0886 18.6138 24.5722C18.6544 24.6171 18.6704 24.6838 18.698 24.7407C18.7202 24.7195 18.7423 24.6989 18.765 24.6777C18.7687 24.6571 18.7755 24.6371 18.7755 24.6165C18.7755 21.7855 18.7786 18.955 18.7699 16.124C18.7699 15.9276 18.7165 15.7161 18.631 15.5385C18.4263 15.1143 18.0519 14.9239 17.5853 14.8833C17.3444 14.8621 17.2011 14.7076 17.2134 14.5076C17.2263 14.2954 17.396 14.1475 17.645 14.1797C17.8896 14.2112 18.1318 14.2748 18.3679 14.3469C18.5025 14.3882 18.623 14.4748 18.7515 14.5415C18.7632 14.5136 18.7736 14.5009 18.7736 14.4882C18.7749 12.9639 18.789 11.4395 18.7693 9.91524C18.7595 9.16672 18.2111 8.69821 17.4556 8.73155C16.5606 8.77155 15.7897 9.15581 15.0268 9.58249C15.0495 9.60371 15.0582 9.61704 15.0711 9.6225C15.1049 9.63644 15.1405 9.64553 15.175 9.65765C15.7534 9.86008 16.1997 10.2183 16.4923 10.7535C16.6202 10.9874 16.5741 11.1947 16.3786 11.2989C16.1887 11.4001 16.0024 11.3341 15.861 11.1147C15.8413 11.0844 15.8235 11.0523 15.8044 11.0213C15.3778 10.3268 14.492 10.0662 13.7635 10.4201C13.0123 10.7856 12.673 11.6262 12.9631 12.3875C13.0295 12.562 13.1266 12.6426 13.3277 12.6638C14.7741 12.816 16.0067 14.1978 15.987 15.6282C15.9833 15.8876 15.8081 16.0622 15.5794 16.0337C15.3711 16.0082 15.2641 15.8634 15.2493 15.59C15.2051 14.7682 14.8166 14.1391 14.1231 13.6984C13.3363 13.1984 12.2328 13.2396 11.524 13.7742C10.6628 14.4233 10.313 15.3773 10.6234 16.3282C10.7322 16.6616 10.6849 16.8816 10.423 17.1337C9.21444 18.2968 9.65951 20.3448 11.2412 20.9315C11.505 21.0291 11.797 21.0575 12.0791 21.1006C12.3176 21.1369 12.4676 21.2666 12.4639 21.4685C12.4596 21.6806 12.2967 21.8188 12.0429 21.8145C11.9033 21.8121 11.7631 21.8012 11.6254 21.7818C11.0347 21.6982 10.5208 21.4448 10.0499 21.0606L10.0486 21.063Z"
                fill="black" />
            <path
                d="M21.0377 8C21.7361 8.12061 22.4117 8.31577 23.0369 8.64973C23.4051 8.8461 23.7641 9.06005 24.1188 9.27945C24.4483 9.4831 24.768 9.7025 25.0913 9.91645C25.9692 10.4983 26.3331 11.4838 26.0417 12.4844C26.0239 12.5457 26.0122 12.6087 25.9956 12.6802C26.6214 12.8226 27.1605 13.096 27.6019 13.5518C28.3802 14.3542 28.6402 15.2979 28.4035 16.3755C28.3703 16.5264 28.3863 16.6264 28.4927 16.744C29.3877 17.735 29.5279 19.1611 28.8431 20.3024C28.7582 20.4436 28.749 20.543 28.8375 20.6909C29.6846 22.1012 29.2586 23.8874 27.8644 24.7862C27.739 24.8668 27.6917 24.948 27.699 25.1007C27.7765 26.6554 26.8925 27.9821 25.4177 28.5536C25.3298 28.5876 25.2425 28.6603 25.1884 28.7373C24.1926 30.1537 22.5629 30.6604 20.9351 30.0361C20.2502 29.7737 19.7197 29.31 19.3214 28.7015C19.263 28.6124 19.2107 28.5197 19.1609 28.4373C18.923 28.7312 18.722 29.0379 18.4644 29.2876C16.8667 30.8355 14.366 30.5792 13.0977 28.7548C13.0326 28.6615 12.9238 28.5761 12.8162 28.5354C11.4177 28.0045 10.5023 26.6457 10.5742 25.165C10.5841 24.9626 10.5214 24.8565 10.3548 24.7498C9.04047 23.9074 8.60646 22.0776 9.40378 20.7466C9.50152 20.5836 9.53533 20.4654 9.42345 20.2817C8.75277 19.1787 8.89047 17.7489 9.75356 16.7767C9.87159 16.6434 9.90971 16.5331 9.86791 16.3537C9.49107 14.753 10.466 13.1663 12.0797 12.7323C12.1431 12.7154 12.2058 12.6978 12.234 12.6899C12.2027 12.3329 12.1332 11.9887 12.1498 11.6486C12.1842 10.9304 12.5316 10.3601 13.1316 9.95706C13.7199 9.56128 14.3155 9.17338 14.9278 8.81519C15.6151 8.41335 16.3559 8.13334 17.1563 8.0303C17.1839 8.02667 17.2104 8.01091 17.2374 8.00061C17.4433 8.00061 17.6499 8.00061 17.8558 8.00061C18.1527 8.13273 18.4589 8.24789 18.7429 8.40365C18.896 8.4879 19.0103 8.64003 19.1535 8.77216C19.4726 8.34123 19.9183 8.12485 20.4187 8H21.0371H21.0377ZM19.5009 12.9475C19.8605 12.8408 20.2023 12.719 20.5539 12.642C20.8404 12.5796 21.0377 12.7238 21.0605 12.9554C21.082 13.176 20.924 13.3166 20.6381 13.3584C20.4808 13.3814 20.3154 13.4111 20.1746 13.4796C19.6748 13.7227 19.4984 14.1518 19.499 14.6785C19.5009 18.5326 19.499 22.3867 19.5009 26.2408C19.5009 26.5305 19.496 26.8226 19.5236 27.1105C19.6398 28.2979 20.4968 29.2561 21.6561 29.5143C22.8119 29.7713 23.9866 29.2791 24.6173 28.2633C24.7311 28.0803 24.8719 27.9633 25.079 27.89C26.4321 27.4118 27.1452 26.2269 26.9294 24.8274C26.8962 24.6135 26.9632 24.4583 27.1581 24.3577C27.2294 24.3207 27.3013 24.2837 27.372 24.245C28.4791 23.6298 28.8781 22.1443 28.2222 21.0848C28.2087 21.0897 28.1933 21.0915 28.1822 21.0994C28.1343 21.1333 28.0888 21.1697 28.0414 21.2042C27.5189 21.5873 26.9355 21.8006 26.2821 21.817C25.9907 21.8242 25.8198 21.6994 25.8124 21.4757C25.805 21.2618 25.9612 21.1248 26.2366 21.1036C26.2661 21.1012 26.2956 21.1006 26.3245 21.0981C27.2909 21.0078 27.9781 20.5169 28.3623 19.6496C28.7558 18.7623 28.5222 17.7416 27.7949 17.0774C27.5872 16.8877 27.5189 16.6967 27.6234 16.441C27.6456 16.3876 27.6572 16.3301 27.6738 16.2743C28.071 14.9276 27.029 13.4536 25.612 13.3596C24.2141 13.2669 23.1057 14.2306 23.0258 15.6094C23.0098 15.8888 22.8598 16.0543 22.636 16.0404C22.4154 16.027 22.282 15.8537 22.2912 15.5925C22.3447 14.0815 23.4967 12.8342 25.0089 12.659C25.1528 12.6426 25.2327 12.5844 25.285 12.4547C25.5056 11.9062 25.4583 11.3844 25.1042 10.9086C24.4255 9.99706 23.0535 10.068 22.4627 11.0371C22.2807 11.3359 22.0945 11.4183 21.8836 11.2941C21.6746 11.171 21.6561 10.9595 21.835 10.6662C22.1307 10.1801 22.5567 9.8516 23.0959 9.66128C23.1444 9.64431 23.1912 9.6231 23.2625 9.59401C22.569 9.1946 21.8818 8.87458 21.1133 8.75397C20.1949 8.61033 19.531 9.06732 19.5082 9.9116C19.4806 10.9341 19.5015 11.9571 19.5015 12.9475H19.5009ZM10.0486 21.063C9.99331 21.1818 9.93737 21.283 9.8968 21.3897C9.46218 22.5261 9.922 23.7195 11.0162 24.3025C11.347 24.4789 11.3605 24.5456 11.3334 24.9086C11.3101 25.2165 11.2996 25.5377 11.3611 25.8371C11.5713 26.8566 12.1953 27.5427 13.1912 27.8881C13.3977 27.9603 13.5404 28.076 13.6553 28.2591C14.1785 29.09 14.9401 29.5288 15.9342 29.5719C17.0911 29.6216 18.1767 28.9033 18.5941 27.8124C19.0054 26.7372 18.6673 25.4602 17.7489 24.7735C17.4507 24.5504 17.088 24.408 16.7468 24.245C16.493 24.1237 16.3909 23.9171 16.512 23.7074C16.6073 23.5431 16.7733 23.4928 17.0167 23.5661C17.6431 23.7552 18.178 24.0886 18.6138 24.5722C18.6544 24.6171 18.6704 24.6838 18.698 24.7407C18.7202 24.7195 18.7423 24.6989 18.765 24.6777C18.7687 24.6571 18.7755 24.6371 18.7755 24.6165C18.7755 21.7855 18.7786 18.955 18.7699 16.124C18.7699 15.9276 18.7165 15.7161 18.631 15.5385C18.4263 15.1143 18.0519 14.9239 17.5853 14.8833C17.3444 14.8621 17.2011 14.7076 17.2134 14.5076C17.2263 14.2954 17.396 14.1475 17.645 14.1797C17.8896 14.2112 18.1318 14.2748 18.3679 14.3469C18.5025 14.3882 18.623 14.4748 18.7515 14.5415C18.7632 14.5136 18.7736 14.5009 18.7736 14.4882C18.7749 12.9639 18.789 11.4395 18.7693 9.91524C18.7595 9.16672 18.2111 8.69821 17.4556 8.73155C16.5606 8.77155 15.7897 9.15581 15.0268 9.58249C15.0495 9.60371 15.0582 9.61704 15.0711 9.6225C15.1049 9.63644 15.1405 9.64553 15.175 9.65765C15.7534 9.86008 16.1997 10.2183 16.4923 10.7535C16.6202 10.9874 16.5741 11.1947 16.3786 11.2989C16.1887 11.4001 16.0024 11.3341 15.861 11.1147C15.8413 11.0844 15.8235 11.0523 15.8044 11.0213C15.3778 10.3268 14.492 10.0662 13.7635 10.4201C13.0123 10.7856 12.673 11.6262 12.9631 12.3875C13.0295 12.562 13.1266 12.6426 13.3277 12.6638C14.7741 12.816 16.0067 14.1978 15.987 15.6282C15.9833 15.8876 15.8081 16.0622 15.5794 16.0337C15.3711 16.0082 15.2641 15.8634 15.2493 15.59C15.2051 14.7682 14.8166 14.1391 14.1231 13.6984C13.3363 13.1984 12.2328 13.2396 11.524 13.7742C10.6628 14.4233 10.313 15.3773 10.6234 16.3282C10.7322 16.6616 10.6849 16.8816 10.423 17.1337C9.21444 18.2968 9.65951 20.3448 11.2412 20.9315C11.505 21.0291 11.797 21.0575 12.0791 21.1006C12.3176 21.1369 12.4676 21.2666 12.4639 21.4685C12.4596 21.6806 12.2967 21.8188 12.0429 21.8145C11.9033 21.8121 11.7631 21.8012 11.6254 21.7818C11.0347 21.6982 10.5208 21.4448 10.0499 21.0606L10.0486 21.063Z"
                stroke="white" strokeWidth="2" mask="url(#path-2-outside-1_2996_33735)" />
            <path
                d="M19.5002 12.9474C19.5002 11.9571 19.4793 10.9334 19.507 9.91155C19.5298 9.06727 20.1937 8.61028 21.1121 8.75392C21.8805 8.87393 22.5678 9.19455 23.2612 9.59396C23.1905 9.62245 23.1432 9.64366 23.0946 9.66124C22.5555 9.85155 22.1295 10.18 21.8338 10.6661C21.6549 10.9595 21.674 11.171 21.8824 11.294C22.0932 11.4183 22.2795 11.3359 22.4614 11.0371C23.0516 10.0679 24.4243 9.99701 25.103 10.9086C25.4571 11.3843 25.5044 11.9062 25.2837 12.4547C25.2315 12.5838 25.1515 12.642 25.0077 12.6589C23.4961 12.8341 22.3434 14.0814 22.2899 15.5924C22.2807 15.8536 22.4141 16.027 22.6348 16.0403C22.8586 16.0542 23.0086 15.8888 23.0245 15.6094C23.1045 14.2305 24.2128 13.2668 25.6108 13.3596C27.0271 13.4535 28.0697 14.9275 27.6726 16.2743C27.656 16.33 27.6443 16.3876 27.6222 16.4409C27.5177 16.6967 27.5865 16.8876 27.7937 17.0773C28.5209 17.7422 28.7545 18.7622 28.3611 19.6496C27.9763 20.5175 27.2896 21.0078 26.3232 21.0981C26.2937 21.1011 26.2642 21.1017 26.2353 21.1036C25.9593 21.1248 25.8038 21.2611 25.8112 21.4757C25.8192 21.6993 25.9894 21.8242 26.2808 21.8169C26.9349 21.8012 27.5177 21.5872 28.0402 21.2042C28.0875 21.1696 28.1336 21.1333 28.181 21.0993C28.192 21.0914 28.2074 21.0896 28.2209 21.0848C28.8769 22.1442 28.4773 23.6297 27.3708 24.2449C27.3001 24.2843 27.2287 24.3207 27.1568 24.3576C26.9619 24.4582 26.8956 24.6134 26.9281 24.8274C27.1439 26.2268 26.4308 27.4117 25.0778 27.8899C24.8706 27.9632 24.7292 28.0802 24.6161 28.2633C23.9848 29.2791 22.8106 29.7718 21.6549 29.5142C20.4949 29.256 19.6386 28.2972 19.5224 27.1105C19.4941 26.8226 19.4996 26.5311 19.4996 26.2407C19.4984 22.3866 19.4996 18.5325 19.4978 14.6784C19.4978 14.1517 19.6736 13.7226 20.1734 13.4796C20.3142 13.4111 20.4795 13.3814 20.6369 13.3584C20.9228 13.3165 21.0807 13.1759 21.0592 12.9553C21.0365 12.7238 20.8391 12.5789 20.5527 12.642C20.201 12.7189 19.8599 12.8408 19.4996 12.9474H19.5002ZM23.8581 18.3368C23.9473 18.3168 24.0253 18.2986 24.1034 18.2828C25.4823 17.9961 26.5206 16.7525 26.5341 15.37C26.5365 15.1239 26.4228 14.973 26.215 14.9457C25.9827 14.9148 25.821 15.0815 25.8056 15.3724C25.7608 16.2009 25.3765 16.8416 24.6733 17.2828C23.7653 17.8525 22.6643 17.7295 21.8018 16.9864C21.5842 16.7991 21.3697 16.784 21.2184 16.9446C21.0648 17.1082 21.0936 17.3191 21.302 17.5143C21.7631 17.9464 22.3084 18.2156 22.936 18.3125C23.0596 18.3319 23.1088 18.3762 23.1377 18.4913C23.1807 18.6586 23.2286 18.8295 23.3079 18.9829C23.7309 19.8047 24.4218 20.2284 25.3501 20.2805C25.5683 20.2926 25.73 20.152 25.7528 19.9568C25.7737 19.7774 25.647 19.6205 25.4392 19.5756C25.3679 19.5599 25.2942 19.5526 25.221 19.5465C24.5718 19.4938 23.9995 18.9956 23.8581 18.3374V18.3368ZM23.8108 23.8079C23.8022 23.7079 23.793 23.6152 23.7868 23.5224C23.6829 22.04 22.4037 20.7987 20.9025 20.7248C20.541 20.7072 20.3517 20.8193 20.3369 21.0605C20.3222 21.2987 20.4974 21.4284 20.8644 21.4521C22.1227 21.5333 23.102 22.5957 23.0713 23.8382C23.0682 23.9722 23.0264 24.0461 22.9016 24.1031C22.2795 24.3843 21.8111 24.8316 21.4865 25.4237C21.2443 25.865 21.1225 26.3395 21.1232 26.8414C21.1232 27.0529 21.2559 27.1947 21.4502 27.2111C21.6555 27.2281 21.8061 27.1026 21.8393 26.8826C21.8522 26.7965 21.8565 26.7093 21.8664 26.6232C21.9623 25.7777 22.4061 25.1516 23.1684 24.7837C23.4942 24.6261 23.8846 24.594 24.2479 24.517C24.4557 24.4728 24.5835 24.3443 24.5774 24.1485C24.5712 23.9558 24.4292 23.8182 24.2202 23.8091C24.0893 23.8037 23.9583 23.8079 23.8114 23.8079H23.8108Z"
                fill="white" />
            <path
                d="M10.0484 21.0629C10.5193 21.4471 11.0333 21.6999 11.624 21.7841C11.7617 21.8035 11.9019 21.8144 12.0414 21.8168C12.2953 21.8211 12.4582 21.6823 12.4625 21.4708C12.4668 21.2689 12.3162 21.1392 12.0777 21.1029C11.7961 21.0598 11.5035 21.0314 11.2398 20.9338C9.65809 20.3471 9.21301 18.2991 10.4216 17.136C10.6841 16.8839 10.7308 16.6633 10.622 16.3305C10.3116 15.3796 10.6613 14.4256 11.5226 13.7765C12.2314 13.2425 13.3348 13.2013 14.1217 13.7007C14.8151 14.1408 15.2036 14.7705 15.2479 15.5923C15.2627 15.8663 15.3696 16.0105 15.578 16.036C15.8067 16.0639 15.9819 15.8899 15.9856 15.6305C16.0053 14.2008 14.7727 12.8183 13.3262 12.6661C13.1246 12.6449 13.0281 12.5637 12.9617 12.3898C12.6715 11.6285 13.0109 10.7879 13.7621 10.4224C14.4906 10.0685 15.3764 10.3291 15.803 11.0236C15.8221 11.0546 15.8393 11.0867 15.8596 11.117C16.001 11.3364 16.1872 11.4024 16.3772 11.3012C16.5727 11.197 16.6188 10.9891 16.4909 10.7558C16.1983 10.2206 15.7526 9.86177 15.1735 9.65995C15.1391 9.64783 15.1034 9.63813 15.0696 9.62479C15.0573 9.61995 15.0481 9.60601 15.0254 9.58479C15.7883 9.15811 16.5585 8.77385 17.4542 8.73385C18.2097 8.70051 18.7581 9.16902 18.7679 9.91753C18.7882 11.4412 18.7734 12.9662 18.7722 14.4905C18.7722 14.5032 18.7624 14.5153 18.7501 14.5438C18.6222 14.4771 18.5017 14.3905 18.3665 14.3492C18.1304 14.2771 17.8882 14.2135 17.6436 14.182C17.3946 14.1498 17.2249 14.2977 17.212 14.5099C17.1997 14.7099 17.3429 14.8644 17.5839 14.8856C18.0499 14.9262 18.4249 15.1166 18.6296 15.5408C18.715 15.7184 18.7679 15.9299 18.7685 16.1263C18.7771 18.9573 18.7747 21.7878 18.7741 24.6188C18.7741 24.6394 18.7673 24.6594 18.7636 24.68C18.7415 24.7012 18.7193 24.7218 18.6966 24.743C18.6689 24.6867 18.653 24.62 18.6124 24.5745C18.1771 24.0909 17.6423 23.7569 17.0153 23.5684C16.7718 23.4951 16.6059 23.5448 16.5106 23.7097C16.3895 23.9194 16.4915 24.1254 16.7454 24.2473C17.0866 24.4103 17.4493 24.5533 17.7474 24.7758C18.6659 25.4619 19.004 26.7395 18.5927 27.8147C18.1753 28.9056 17.0891 29.6239 15.9327 29.5742C14.9393 29.5311 14.177 29.0923 13.6539 28.2614C13.5389 28.0783 13.3963 27.9626 13.1898 27.8904C12.1939 27.5444 11.5699 26.8589 11.3597 25.8394C11.2976 25.54 11.3087 25.2188 11.332 24.9109C11.3597 24.5485 11.3462 24.4812 11.0148 24.3048C9.92058 23.7218 9.46137 22.5284 9.89538 21.392C9.93595 21.2853 9.99189 21.1841 10.0472 21.0653L10.0484 21.0629ZM15.2086 18.7197C15.0948 19.1767 14.8545 19.524 14.4567 19.7222C14.2151 19.8422 13.9299 19.8828 13.6607 19.9434C13.4277 19.9956 13.2869 20.1386 13.3047 20.3398C13.3219 20.5332 13.4867 20.6695 13.7031 20.6689C14.6793 20.6677 15.6383 19.9549 15.8756 19.0252C15.9346 18.7925 16.0342 18.707 16.2702 18.6658C16.8647 18.5616 17.3737 18.2749 17.8009 17.8536C17.9749 17.6821 17.9829 17.4839 17.8378 17.3288C17.7013 17.1833 17.4849 17.1821 17.3024 17.3288C17.2624 17.3609 17.2268 17.3979 17.188 17.4318C16.7755 17.7894 16.2942 17.9906 15.7471 18.0149C14.4125 18.0743 13.3355 17.1027 13.2562 15.779C13.2383 15.4832 13.0883 15.3111 12.8609 15.3269C12.6297 15.3426 12.4988 15.5244 12.5191 15.8208C12.5855 16.7972 13.0121 17.5827 13.8137 18.1652C14.2244 18.4634 14.6903 18.63 15.2092 18.7203L15.2086 18.7197ZM13.2955 24.5848C13.124 24.5848 12.9764 24.5739 12.8314 24.5873C12.6316 24.6061 12.5283 24.743 12.5215 24.9255C12.5154 25.1006 12.6174 25.2279 12.7957 25.2758C12.8584 25.2928 12.9267 25.2915 12.9924 25.2964C13.9606 25.3697 14.6541 25.8504 15.0494 26.7122C15.1754 26.9874 15.195 27.3128 15.2485 27.6177C15.2885 27.8438 15.4366 27.9983 15.6358 27.9868C15.8399 27.9753 15.9936 27.8056 15.9819 27.5832C15.9192 26.3861 15.369 25.4806 14.2871 24.9224C14.0658 24.8079 14.0197 24.6788 14.0332 24.4654C14.1094 23.2163 15.0174 22.3084 16.2942 22.2114C16.6176 22.1872 16.7645 22.0678 16.7571 21.8356C16.7497 21.5987 16.5794 21.4799 16.2462 21.4987C15.1883 21.5593 14.3713 22.0381 13.7879 22.9048C13.4498 23.4072 13.3023 23.9697 13.2943 24.5836L13.2955 24.5848Z"
                fill="white" />
            <path
                d="M23.859 18.3365C24.0004 18.9947 24.5727 19.4929 25.2219 19.5456C25.295 19.5517 25.3688 19.559 25.4401 19.5747C25.6473 19.6196 25.7739 19.7766 25.7536 19.956C25.7309 20.1505 25.5692 20.2917 25.351 20.2796C24.4233 20.2281 23.7324 19.8038 23.3088 18.982C23.2301 18.8292 23.1816 18.6583 23.1385 18.4904C23.109 18.3753 23.0605 18.331 22.9369 18.3116C22.3093 18.2147 21.7634 17.9456 21.3029 17.5134C21.0945 17.3183 21.0656 17.1067 21.2193 16.9437C21.3705 16.7825 21.5857 16.7982 21.8027 16.9855C22.6652 17.7286 23.7662 17.8516 24.6742 17.2819C25.3774 16.8407 25.7616 16.2 25.8065 15.3715C25.8219 15.0806 25.9836 14.9139 26.2159 14.9448C26.4237 14.9721 26.5374 15.123 26.535 15.3691C26.5208 16.7516 25.4832 17.9953 24.1043 18.2819C24.0262 18.2983 23.9482 18.3165 23.859 18.3359V18.3365Z"
                fill="black" />
            <path
                d="M23.8118 23.8079C23.9581 23.8079 24.0897 23.803 24.2206 23.8091C24.4302 23.8182 24.5716 23.9557 24.5778 24.1485C24.5845 24.3442 24.456 24.4727 24.2483 24.517C23.8849 24.5939 23.4946 24.6261 23.1688 24.7837C22.4065 25.1515 21.9627 25.7776 21.8668 26.6231C21.8569 26.7098 21.8526 26.7971 21.8397 26.8825C21.8065 27.1025 21.6559 27.228 21.4506 27.211C21.2563 27.1947 21.1235 27.0528 21.1235 26.8413C21.1235 26.3395 21.2453 25.8649 21.4868 25.4237C21.8114 24.8315 22.2799 24.3842 22.902 24.103C23.0268 24.0467 23.068 23.9721 23.0716 23.8382C23.1024 22.5957 22.1231 21.5332 20.8647 21.452C20.4977 21.4284 20.3225 21.2987 20.3373 21.0605C20.352 20.8192 20.5414 20.7071 20.9028 20.7247C22.404 20.7986 23.6833 22.0399 23.7872 23.5224C23.794 23.6151 23.8026 23.7078 23.8112 23.8079H23.8118Z"
                fill="black" />
            <path
                d="M15.2088 18.7199C14.6899 18.6296 14.2239 18.4635 13.8133 18.1647C13.0117 17.5823 12.5851 16.7968 12.5187 15.8204C12.4984 15.524 12.6293 15.3422 12.8605 15.3264C13.0873 15.3107 13.2379 15.4828 13.2557 15.7786C13.3356 17.1023 14.4127 18.0732 15.7467 18.0144C16.2938 17.9902 16.7751 17.7896 17.1876 17.4314C17.2263 17.398 17.262 17.3605 17.3019 17.3283C17.4845 17.1823 17.7009 17.1829 17.8374 17.3283C17.9825 17.4829 17.9745 17.6817 17.8005 17.8532C17.3733 18.2744 16.8643 18.5605 16.2698 18.6654C16.0337 18.7066 15.9341 18.792 15.8751 19.0248C15.6385 19.9545 14.6795 20.6667 13.7026 20.6685C13.4863 20.6685 13.3215 20.5327 13.3043 20.3394C13.2865 20.1382 13.4272 19.9957 13.6602 19.943C13.9295 19.8824 14.2147 19.8418 14.4563 19.7218C14.8541 19.5242 15.0944 19.1763 15.2081 18.7193L15.2088 18.7199Z"
                fill="black" />
            <path
                d="M13.2955 24.5843C13.3034 23.9704 13.4504 23.4079 13.7891 22.9055C14.3725 22.0394 15.1895 21.5606 16.2474 21.4994C16.5806 21.48 16.7509 21.5988 16.7583 21.8363C16.765 22.0685 16.6187 22.1873 16.2954 22.2121C15.0186 22.3091 14.1106 23.217 14.0344 24.4662C14.0215 24.6795 14.0669 24.8086 14.2883 24.9231C15.3696 25.482 15.9204 26.3875 15.9831 27.5839C15.9948 27.8063 15.8405 27.976 15.637 27.9875C15.4378 27.999 15.2897 27.8445 15.2497 27.6184C15.1962 27.3136 15.1766 26.9881 15.0505 26.7129C14.6553 25.8505 13.9618 25.3704 12.9936 25.2971C12.9278 25.2923 12.8596 25.2935 12.7969 25.2765C12.6186 25.2286 12.5166 25.1013 12.5227 24.9262C12.5289 24.7431 12.6328 24.6068 12.8326 24.588C12.9776 24.574 13.1252 24.5856 13.2967 24.5856L13.2955 24.5843Z"
                fill="black" />
        </Svg>
    );
};

export default Icon;
