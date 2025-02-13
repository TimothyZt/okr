export const hasPermission = (user: any, permission: string): boolean => { 
    const { LoginId } = user
    // TODO: Add any logic to check the role of the user
    if (LoginId === 'T0001') {
        return true
    }
    return false
}