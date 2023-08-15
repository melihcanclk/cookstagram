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
    accept?: Accept;
}

interface ButtonProps {
    text: string;
    onSubmit?: () => void;
    onClick?: () => void;
    width?: string;
    variant?: 'contained' | 'outlined' | 'text';
    margin?: string;

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
    content: string;
    createdAt: string;
    user: UserType;
}

interface GetImageProps {
    setImageBase64: React.Dispatch<React.SetStateAction<string>>;
    user: UserType;
}


interface IndividualPostProps {
    key: number;
    post: IndividualPost;
    handleDelete: (id: string) => void;
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
    value: string;
}

type ProfileProps = {
    user?: UserType | null;
}

type ProfileBannerProps = {
    user: UserType;
    posts: IndividualPost[];

}

