import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from '../screens/dashboard/HomeScreen';
import PlanYourLearningScreen from '../screens/PlanYourLearning';
import ChapterDetails from '../screens/ChapterDetails';
import VideoDetailScreen from '../screens/VideoDetails';
import TestPapersScreen from '../screens/TestPapers';
import TipsAndTricksScreen from '../screens/Tips&Tricks';
import RefernceBookScreen from '../screens/RefernceBook';
import StuSubscription from '../screens/Student/StuSubscription';
import ParentProfile from '../screens/Student/ParentProfile';
import ParentProfileEdit from '../screens/Student/ParentProfileEdit';
import StuProfileEdit from '../screens/Student/StuProfileEdit';
import ParentDetail from '../screens/Student/ParentDetail';
import StudentDashBoard from '../screens/Student/StudentDashboard';
import ParentOtp from '../screens/Student/ParentOtp'
import StuProfile from '../screens/Student/StuProfile';
import Congratulation from '../screens/Congratulation';
import MyProfile from '../screens/MyProfile/StudentProfile'
import DashBoardScreen from '../screens/dashboard/DashBoardScreen';
import Subscription from '../screens/dashboard/Subscription';
import ParentDetailsForm from '../screens/Student/ParentDetailsForm'
import MyChildrenScreen from '../screens/MyChildren/MyChildrenScreen'
import AddChildrenScreen from '../screens/MyChildren/AddChildrenScreen'
import AddChildrenFormScreen from "../screens/MyChildren/AddChildrenFormScreen"
import ParentCongratulationsScreen from '../screens/Congratulation/ParentCongratulationsScreen';
import Feedback from '../screens/Feedback'
import StudentOtp from "../screens/MyChildren/StudentOtp"
import IosPaymentStaticScreen from '../commonComponents/IosPaymentStaticScreen'
import WhiteScreen from '../screens/Student/WhiteScreen'
import MySubscriptionScreen from '../screens/MyChildren/MySubscriptionScreen'
const  AppNavigator = createStackNavigator(
    {
        // HomeScreen : {
        //     screen: HomeScreen,
        //     navigationOptions: ({navigation})=>(
        //         {
        //             headerShown: false
        //         }
        //     )
        // },
        PlanYourLearning:{
            screen:PlanYourLearningScreen,
            navigationOptions: ({navigation})=>(
                {
                    headerShown: false
                }
            )
        },
        ChapterDetails:{
            screen:ChapterDetails,
            navigationOptions: ({navigation})=>(
                {
                    headerShown: false
                }
            )
        },
        VideoDetail:{
            screen:VideoDetailScreen,
            navigationOptions: ({navigation})=>(
                {
                    headerShown: false
                }
            )
        },
        TestPapers:{
            screen:TestPapersScreen,
            navigationOptions:({navigation})=>(
                {
                    headerShown:false
                }
            )
        },
        TipsAndTricks:{
            screen:TipsAndTricksScreen,
            navigationOptions:({navigation})=>(
                {
                    headerShown:false
                }
            )
        },
        RefernceBook:{
            screen:RefernceBookScreen,
            navigationOptions:({navigation}) =>(
                {
                    headerShown:false
                }
            )
        },
        StuSubscription: {
            screen: StuSubscription,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            )
        },
        ParentProfile: {
            screen: ParentProfile,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            )
        },
        ParentDetailsForm: {
            screen: ParentDetailsForm,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            )
        },
        ParentProfileEdit: {
            screen: ParentProfileEdit,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            )
        },
        StuProfileEdit: {
            screen: StuProfileEdit,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            )
        },
        ParentDetail: {
            screen: ParentDetail,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            )
        },
        StudentDashBoard: {
            screen: StudentDashBoard,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            )
        },
        StuProfile: {
            screen: StuProfile,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            )
        },
        Congratulation:{
            screen: Congratulation,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            ) 
        },
        MyProfile:{
            screen:MyProfile,
            navigationOptions: ({ navigation }) => (
                {
                    headerShown: false
                }
            ) 
        },
        DashBoardScreen: {
            screen: DashBoardScreen,
            navigationOptions: ({navigation}) => ({
              headerShown: false,
            }),
          },
          Subscription: {
            screen: Subscription,
            navigationOptions: ({navigation}) => ({
              headerShown: false,
            }),
          },
          MyChildren: {
            screen: MyChildrenScreen,
            navigationOptions: ({navigation}) => ({
              headerShown: false,
            }),
          },
          AddChildren: {
            screen: AddChildrenScreen,
            navigationOptions: ({navigation}) => ({
              headerShown: false,
            }),
          },
          AddChildrenForm: {
            screen: AddChildrenFormScreen,
            navigationOptions: ({navigation}) => ({
              headerShown: false,
            }),
          },
          ParentCongratulations: {
            screen: ParentCongratulationsScreen,
            navigationOptions: ({navigation}) => ({
              headerShown: false,
            }),
          },
          ParentOtp: {
            screen: ParentOtp,
            navigationOptions: ({navigation}) => ({
              headerShown: false,
            }),
          },
          Feedback:{
              screen:Feedback,
              navigationOptions: ({navigation}) => ({
                headerShown: false,
              }),
          },
          StudentOtp:{
              screen:StudentOtp,
              navigationOptions: ({navigation}) => ({
                headerShown: false,
              }),
          },
          "IosPayment":{
              screen:IosPaymentStaticScreen,
              navigationOptions: ({navigation}) => ({
                headerShown: false,
              }),
          },
          WhiteScreen:{
              screen:WhiteScreen,
              navigationOptions: ({navigation}) => ({
                headerShown: false,
              }),
          },
          MySubscriptionScreen:{
              screen:MySubscriptionScreen,
              navigationOptions: ({navigation}) => ({
                headerShown: false,
              }),
          }
        //   Introduction: {
        //     screen: IntroductionScreen,
        //     navigationOptions: ({navigation}) => ({
        //       headerShown: false,
        //     }),
        //   },

    },{
        initialRouteName:'WhiteScreen',
        
    }

)

  /** App Stack Navigation Options */
  AppNavigator.navigationOptions = ({navigation}) => {
    global.navigation = navigation;
  }
  export default AppNavigator