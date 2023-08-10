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

type UserType = {
    name: string,
    surname: string,
    username: string,
    email: string,
    picture: {
        fileName: string,
    },
    createdAt: string,
    token: string,
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
    title: string;
    content: string;
    createdAt: string;
    user: {
        name: string;
        surname: string;
        username: string;
        picture: string;
    };
}

interface IndividualPostProps {
    key: number;
    post: IndividualPost;
}