import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


const PrivacyPopup = (props) => {
    return <Modal
        hasBackdrop={false}
        isVisible={props.isVisible}
        style={{
            margin: 0
        }}>
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                {/* <ActivityIndicator size="large" color="#FFAD36" /> */}
                <Text style={styles.titleStyle}>Privacy Policy</Text>
                <ScrollView style={styles.scrollStyle}>
                    <Text style={styles.paragraph}>It is our sincere endeavour to preserve and value your trust. In order to preserve and honour that trust, AllnAll LearnLite adheres to unique ethical standards in gathering, using, and safeguarding any information you provide. AllnAll LearnLite is a planning and learning App which provides coaching for students in class 11 and class 12. All n All LearnLite is a planning and learning Mobile Application and Web portal which is used by Students for preparing for Under-graduation. This Web Application and Mobile Application has recommended online course videos for all subjects and chapters, test papers with solutions, Tips and tricks, reference books. The Planning module helps plan the studies for students and progress dashboard is available to update progress to both students and parents.</Text>
                    <Text style={styles.paragraph}>This privacy policy governs your use of the application AllnAll LearnLite ('Application'), www. LearnLite.in ('Website') and the other associated applications, products, websites and services managed by the AllnAll LearnLite. Please read this privacy policy ('Policy') carefully before using the Application, Website, our services and products, along with the Terms of Use ('ToU') provided on the Application and the Website. Your use of the Website, Application, or services in connection with the Application, Website or products ('Services'), or registrations with us through any modes or usage of any products including through SD cards, tablets or other storage/transmitting device shall signify your acceptance of this Policy and your agreement to be legally bound by the same. If you do not agree with the terms of this Policy, do not use the Website, Application our products or avail any of our Services.</Text>
                    <Text style={styles.heading}>User Provided Information</Text>
                    <Text style={styles.paragraph}>Planning is the key to your success- this is the unique feature of AllnAll LearnLite. We may use the Information to contact you from time to time, to provide you with the Services, important information, required notices and marketing promotions. We will ask you when we need more information that personally identifies you (personal information) or allows us to contact you. We will not differentiate between who is using the device to access the Application, Website or Services or products, so long as the log in/access credentials match with yours. In order to make the best use of the Application/Website/Services/products and enable your Information to be captured accurately on the Application/Website/Services/products, it is essential that you have logged in using your own credentials. We will, at all times, provide the option to you to not provide the Personal Information or Sensitive Personal Information, which we seek from you. Further, you shall, at any time while using the Application/Services/products, also have an option to withdraw your consent given earlier to us to use such Personal Information or Sensitive Personal Information. Such withdrawal of the consent is required to be sent in writing to us at the contact details provided in this Policy below. In such event, however, the AllnAll LearnLite fully reserves the right not to allow further usage of the Application or provide any Services/products thereunder to you. The Application/Website/Services/products obtains the information you provide when you download and register for the Application or Services or products. When you register with us, you generally provide (a) your name, age, email address, location, phone number, password and your ward's educational interests; (b) transaction-related information, such as when you make purchases, respond to any offers, or download or use applications from us; (c) information you provide us when you contact us for help; (d) information you enter into our system when using the Application/Services/products, such as while asking doubts, participating in discussions and taking tests. The said information collected from the users could be categorized as “Personal Information”, “Sensitive Personal Information” and “Associated Information”. Personal Information, Sensitive Personal Information and Associated Information (each as individually defined under this Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011 (the “Data Protection Rules”)) shall collectively be referred to as 'Information' in this Policy.</Text>
                    <Text style={styles.heading}>Additional information collected</Text>
                    <Text style={styles.paragraph}>AllnAll LearnLite focus on planning/adherence while students have options to follow AllnAll LearnLite videos /test papers or others. The Application/products/Services may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile devices unique device ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browsers you use, and information about the way you use the Application/Services/products. As is true of most Mobile applications, we also collect other relevant information as per the permissions that you provide. We use an outside credit card processing AllnAll LearnLite to bill you for goods and services. These companies do not retain, share, store or use personally identifiable information for any other purpose.</Text>

                    <Text style={styles.heading}>How we use your Personal Information</Text>
                    <Text style={styles.paragraph}>use the collected Information to analyse trends, to conduct research, to administer the Application/Services and products, to learn about each user's learning patterns and movements around the Application/Services and products and to gather demographic information and usage behaviour about our user base as a whole. Aggregated and individual, anonymized and non-anonymized data may periodically be transmitted to external service providers to help us improve the Application, products and our Services. We will share your information with third parties only in the ways that are described below in this Policy. We may use the individual data and behavior patterns combined with personal information to provide you with personalized content, and better your learning objectives. Third parties provide certain services which we may use to analyze the data and information to personalize, drive insights and help us better your experience or reach out to you with more value added applications, products, information and services. However, these third party companies do not have any independent right to share this information. We do not sell, trade or rent your Information to any third party unless, we have been expressly authorized by you either in writing or electronically to do so. We may at times provide aggregate statistics about our customers, traffic patterns, and related site information to reputable third parties, however this information when disclosed will be in an aggregate form and does not contain any of your Personally Identifiable Information. AllnAll LearnLite will occasionally send email notices or contact you to communicate about our Services, products and benefits, as they are considered an essential part of the Services/products you have chosen. We may disclose Information:</Text>
                    <Text style={styles.bulletPoints}><Text style={{fontSize:heightPercentageToDP('3%')}}>• </Text>as required by law, such as to comply with a subpoena, or similar legal process;{"\n"}
                    <Text style={{fontSize:heightPercentageToDP('3%')}}>• </Text>to enforce applicable ToU, including investigation of potential violations thereof;{"\n"}
                    <Text style={{fontSize:heightPercentageToDP('3%')}}>• </Text>when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, address security or technical issues or respond to a government request;{"\n"}
                    <Text style={{fontSize:heightPercentageToDP('3%')}}>• </Text>with our trusted services providers who work on our behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this Policy;{"\n"}
                    <Text style={{fontSize:heightPercentageToDP('3%')}}>• </Text>to protect against imminent harm to the rights, property or safety of the Application/Website/ AllnAll LearnLite or its users or the public as required or permitted by law;{"\n"}
                    <Text style={{fontSize:heightPercentageToDP('3%')}}>• </Text>with third party service providers in order to personalize the Application/Website/Services/products for a better user experience and to perform behavioural analysis;{"\n"}
                    <Text style={{fontSize:heightPercentageToDP('3%')}}>• </Text>ny portion of the Information containing personal data relating to minors provided by you shall be deemed to be given with the consent of the minor's legal guardian. Such consent is deemed to be provided by your registration with us.</Text>
                    <Text style={styles.heading}>Access to your Personal Information</Text>
                    <Text style={styles.paragraph}>We will provide you with the means to ensure that your Personal Information is correct and current. If you have filled out a user profile, we will provide an obvious way for you to access and change your profile from our Application/Services/Website/products. We adopt reasonable security measures to protect your password from being exposed or disclosed to anyone.</Text>

                    <Text style={styles.heading}>Cookies</Text>
                    <Text style={styles.paragraph}>We send cookies (small files containing a string of characters) to your computer, thereby uniquely identifying your browser. Cookies are used to track your preferences, help you login faster, and aggregated to determine user trends. This data is used to improve our offerings, such as providing more content in areas of greater interest to a majority of users. Most browsers are initially set up to accept cookies, but you can reset your browser to refuse all cookies or to indicate when a cookie is being sent. Some of our features and services may not function properly if your cookies are disabled.</Text>

                    <Text style={styles.heading}>Links</Text>
                    <Text style={styles.paragraph}>We may present links in a format that enables us to keep track of whether these links have been followed. We use this information to improve our customized content. Clicking on links may take you to sites outside our domain. We are not responsible for the privacy practices of other web sites. We encourage our users to be aware when they leave our site to read the privacy statements of each and every web site that collects personally identifiable information. This Privacy Policy applies solely to information collected by our Website.</Text>

                    <Text style={styles.heading}>Alerts</Text>
                    <Text style={styles.paragraph}>We may alert you by email or phone (through sms/call) to inform you about new service offerings or other information which we feel might be useful for you.</Text>

                    <Text style={styles.heading}>Public Forums</Text>
                    <Text style={styles.paragraph}>When you use certain features on our website like the discussion forums and you post or share your personal information such as comments, messages, files, photos, will be available to all users, and will be in the public domain. All such sharing of information is done at your own risk. Please keep in mind that if you disclose personal information in your profile or when posting on our forums this information may become publicly available.</Text>

                    <Text style={styles.heading}>Security</Text>
                    <Text style={styles.paragraph}>We are concerned about safeguarding the confidentiality of your Information. We provide physical, electronic, and procedural safeguards to protect Information we process and maintain. For example, we limit access to this Information to authorized e mployees only who need to know that information in order to operate, develop or improve our Application/Services/products/Website. Please be aware that, although we endeavour to provide reasonable security for information we process and maintain, no security system can prevent all potential security breaches.

</Text>

                    <Text style={styles.heading}>How Long Do We Retain User Data?</Text>
                    <Text style={styles.paragraph}>Currently, we plan to retain user data while an account is active and for at least three years afterward. We may alter this practice according to legal and business requirements. For example, we may lengthen the retention period for some data if needed to comply with law or voluntary codes of conduct. Unless otherwise prohibited, we may shorten the retention period for some types of data if needed to free up storage space.</Text>

                    <Text style={styles.heading}>Log information</Text>
                    <Text style={styles.paragraph}>When you access our Website, our servers automatically record information that your browser sends whenever you visit a website. These server logs may include information such as your web request, internet protocol address, browser type, browser language, the date and time of your request and one or more cookies that may uniquely identify your browser.

</Text>

                    <Text style={styles.heading}>User communications</Text>
                    <Text style={styles.paragraph}>When you send an email or other communication to us, we may retain those communications in order to process your inquiries, respond to your requests and improve our Services.</Text>

                    <Text style={styles.heading}>Changes to this Statement</Text>
                    <Text style={styles.paragraph}>As the AllnAll LearnLite evolves, our privacy policy will need to evolve as well to cover new situations. You are advised to review this Policy regularly for any changes, as continued use is deemed approval of all changes.</Text>

                    <Text style={styles.heading}>Your Consent</Text>
                    <Text style={styles.paragraph}>We believe that, every user of our Application/Services/products/Website must be in a position to provide an informed consent prior to providing any Information required for the use of the Application/Services/products/Website. By registering with us, you are expressly consenting to our collection, processing, storing, disclosing and handling of your information as set forth in this Policy now and as amended by us. Processing, your information in any way, including, but not limited to, collecting, storing, deleting, using, combining, sharing, transferring and disclosing information, all of which activities will take place in India. If you reside outside India your information will be transferred, processed and stored in accordance with the applicable data protection laws of India.</Text>

                    <Text style={styles.heading}>Contact Information</Text>
                    <Text style={styles.paragraph}>Our Grievance Officer shall undertake all reasonable efforts to address your grievances at the earliest possible opportunity. You may contact us at: info@LearnLite.in</Text>
                </ScrollView>
                <TouchableOpacity style={styles.closeButtonStyle} onPress={()=>{
                    props.close()
                }}>
                    <Text style={styles.closeButtonTextStyle}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
}

export default PrivacyPopup

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: heightPercentageToDP('90%'),
        width: widthPercentageToDP('90%'),
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        //   justifyContent: 'space-around',
    },
    titleStyle: {
        fontFamily: 'Sora-Bold',
        color: '#184E76',
        fontSize: heightPercentageToDP('3%'),
        marginVertical: heightPercentageToDP('2%'),
        marginTop:heightPercentageToDP('3%')
    },
    scrollStyle: {
        flex: 1,
        paddingHorizontal: heightPercentageToDP('2.5%')
    },
    closeButtonStyle: {
        height: heightPercentageToDP('5%'),
        width: heightPercentageToDP('12%'),
        backgroundColor: '#C9302C',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: heightPercentageToDP('2%')
    },
    closeButtonTextStyle: {
        fontFamily: 'Sora-Bold',
        fontSize: heightPercentageToDP('2%'),
        color: '#fff'
    },
    paragraph: {
        fontSize: heightPercentageToDP('2%'),
        fontFamily: 'Sora-Medium',
        color: '#333',
        textAlign: 'justify',
        marginBottom: heightPercentageToDP('1.8%')
    },
    bulletPoints:{
        fontSize: heightPercentageToDP('2%'),
        fontFamily: 'Sora-Medium',
        color: '#333',
        textAlign: 'justify',
        marginLeft:heightPercentageToDP('2.5%'),
        marginBottom:heightPercentageToDP('2%')
    },
    heading:{
        fontFamily: 'Sora-Bold',
        color: '#666',
        fontSize: heightPercentageToDP('2.8%'),
        marginVertical: heightPercentageToDP('2%'),
        marginTop:heightPercentageToDP('3%')
    }
});