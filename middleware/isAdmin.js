export default function(context) {
    if (context.$auth.$state.user !== null) {
        if (context.$auth.$state.user.role_view !== 'admin') {
            context.redirect('/')
        }
    }
    else {
        console.log('User empty')
    }
}