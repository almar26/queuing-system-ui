export default function(context) {
    if (context.$auth.$state.user !== null) {
        if(context.$auth.$state.user.role_view !== 'basic') {
            context.redirect('/admin')
        } 
    }
    else {
        console.log('User empty')
    }
}