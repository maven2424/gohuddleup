import { supabase, createServerClient } from './supabase'

export async function signInAdmin(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    if (data.user) {
      // Check if user has admin role
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (userError) {
        throw userError
      }

      if (userData && ['SUPER', 'STATE', 'REGION', 'SCHOOL'].includes(userData.role)) {
        return { user: data.user, userData }
      } else {
        throw new Error('User does not have admin privileges')
      }
    }

    return { user: data.user }
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

export async function signOut() {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}

export async function getCurrentUser() {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      throw error
    }

    if (user) {
      if (!supabase) {
        throw new Error('Supabase client not initialized')
      }
      
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (userError) {
        throw userError
      }

      return { user, userData }
    }

    return { user: null, userData: null }
  } catch (error) {
    console.error('Get current user error:', error)
    return { user: null, userData: null }
  }
}

export async function createAdminUser(email: string, password: string, role: 'SUPER' | 'STATE' | 'REGION' | 'SCHOOL', scopeId: string) {
  const serverClient = createServerClient()
  
  try {
    // Create auth user
    const { data: authData, error: authError } = await serverClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      throw authError
    }

    if (authData.user) {
      // Create user record
      const { error: userError } = await serverClient
        .from('users')
        .insert({
          id: authData.user.id,
          email: authData.user.email!,
          role,
          status: 'ACTIVE',
        })

      if (userError) {
        throw userError
      }

      // Create role assignment
      const { error: roleError } = await serverClient
        .from('role_assignments')
        .insert({
          user_id: authData.user.id,
          role,
          scope_type: role === 'SUPER' ? 'STATE' : role,
          scope_id: scopeId,
        })

      if (roleError) {
        throw roleError
      }

      return authData.user
    }
  } catch (error) {
    console.error('Create admin user error:', error)
    throw error
  }
}

export async function getUserRole(userId: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  try {
    const { data, error } = await supabase
      .from('role_assignments')
      .select('*')
      .eq('user_id', userId)
      .order('role', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Get user role error:', error)
    return null
  }
}

export async function signInWithEmailAndPassword(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    if (data.user) {
      // Check if user has student role
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (userError) {
        throw userError
      }

      if (userData && userData.role === 'STUDENT') {
        return { user: data.user, userData }
      } else {
        throw new Error('User does not have student privileges')
      }
    }

    return { user: data.user }
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

export async function getStudentProfile(userId: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        schools (
          name,
          huddles (
            name
          )
        )
      `)
      .eq('user_id', userId)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Get student profile error:', error)
    return null
  }
}

export async function updateStudentProfile(userId: string, profileData: Record<string, unknown>) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  try {
    const { data, error } = await supabase
      .from('students')
      .update(profileData)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Update student profile error:', error)
    throw error
  }
}

