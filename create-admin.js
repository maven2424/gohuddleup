// Script to create the first admin user
// Run this with: node create-admin.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!')
  console.error('Please make sure you have:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdminUser() {
  try {
    console.log('🔐 Creating admin user...')
    
    // Get the first state ID for scope
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('id')
      .limit(1)
    
    if (statesError || !states.length) {
      throw new Error('No states found in database')
    }
    
    const stateId = states[0].id
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@gohuddleup.com',
      password: 'admin123456',
      email_confirm: true,
    })

    if (authError) {
      throw authError
    }

    console.log('✅ Auth user created:', authData.user.email)

    // Create user record
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        role: 'SUPER',
        status: 'ACTIVE',
      })

    if (userError) {
      throw userError
    }

    console.log('✅ User record created')

    // Create role assignment
    const { error: roleError } = await supabase
      .from('role_assignments')
      .insert({
        user_id: authData.user.id,
        role: 'SUPER',
        scope_type: 'STATE',
        scope_id: stateId,
      })

    if (roleError) {
      throw roleError
    }

    console.log('✅ Role assignment created')
    
    console.log('\n🎉 Admin user created successfully!')
    console.log('📧 Email: admin@gohuddleup.com')
    console.log('🔑 Password: admin123456')
    console.log('👤 Role: SUPER ADMIN')
    console.log('\n⚠️  Please change the password after first login!')

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    process.exit(1)
  }
}

createAdminUser()
