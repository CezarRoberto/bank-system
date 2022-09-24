import { IGoogleSignInProvider } from "@shared/providers/googleSIngIn/IGoogleSignInProvider";
import { GoogleSignInProvider } from "@shared/providers/googleSIngIn/implementation/GoogleSignInProvider";
import { container } from "tsyringe";

container.registerSingleton<IGoogleSignInProvider>(
    'GoogleSignInProvider',
    GoogleSignInProvider,
)