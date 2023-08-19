// #####TYPES#####
type AvatarItemProps = {
    src: string,
    alt?: string,
}

type LeftArrowProps = {
    fill?: string,
    height?: string,
    width?: string,
}

type LoginResponse = {
    message: string,
    user: UserType,
    token: string,
}


interface Accept {
    id: string;
}


interface Followers extends Accept {
}

interface Following extends Accept {
}



type UserType = {
    id: string,
    name: string,
    surname: string,
    username: string,
    email: string,
    picture: {
        fileName: string,
    },
    createdAt: string,
    token: string,
    followers: Followers[],
    following: Following[],
    posts: IndividualPost[],
}


// #####INTERFACES#####
interface IDropzoneProps {
    file: any;
    setFile: (file: any) => void;
    children?: React.ReactNode;
}

interface ButtonProps {
    children: React.ReactNode;
    onSubmit?: () => void;
    onClick?: () => void;
    width?: string;
    height?: string;
    type?: 'submit' | 'button' | 'reset';
    variant?: 'contained' | 'outlined' | 'text';
    margin?: string;
    backgroundColor?: string;
    color?: string;
}

interface PasswordProps {
    errors: FieldErrors<FieldValues>,
    fieldname: string,
    placeholder?: string,
}


interface RequiredFieldProps extends PasswordProps {
}

interface NumberProps extends PasswordProps {
    min?: number,
    validate?: boolean,
}

interface Props extends RequiredFieldProps, NumberProps { }

interface FooterItemProps {
    href: string;
    text: string;
}

interface SocialIconProps {
    href: string;
    children: React.ReactNode;
}

interface LayoutProps {
    children: ReactComponentElement<any> | ReactComponentElement<any>[];
}

interface NavbarItemProps {
    href: string;
    children: ReactNode;
}

interface IndividualPost {
    id: string;
    title: string;
    prepTimeInMins: number;
    cookTimeInMins: number;
    servings: number;
    ingredients: [
        {
            id: string;
            name: string;
            quantity: number;
            unit: string;
        }
    ];
    directions: string;
    steps: string[];
    picture: string;
    createdAt: string;
    user: {
        id: string;
        username: string;
    };
}

interface GetImageProps {
    setImageBase64: React.Dispatch<React.SetStateAction<string>>;
}

interface UserImageProps extends GetImageProps {
    user: UserType;
}

interface PostImageProps extends GetImageProps {
    post: IndividualPost;
}

type ImageProps = UserImageProps | PostImageProps;

interface IndividualPostProps {
    key: number;
    post: IndividualPost;
    handleDelete: (id: string) => void;
    user: UserType;
}

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
}

interface SearchBarOptionsType {
    label: string;
    value: {
        id: string;
        username: string;
    }
}

type ProfileProps = {
    user?: UserType | null;
}

type ProfileBannerProps = {
    user: UserType;
    posts: IndividualPost[];

}

type ThemeTypes = 'light' | 'dark';

type LoginLayoutProps = {
    children: React.ReactNode;
    themeStorage: ThemeTypes,
    setThemeStorage: Dispatch<SetStateAction<ThemeTypes>>,
    maxHeight: string,
    title: string,
}

type CardImageAreaProps = {
    height?: string,
    image: string | null,
    post: IndividualPost | null,
    clickable?: boolean
}